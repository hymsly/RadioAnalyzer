'use strict';

const spawn = require('child_process').spawn;
var audioModel = require('../models/audio');
const path = require('path');
const RADIO = {
    RPP: "https://18493.live.streamtheworld.com/RADIO_RPP.mp3",
    MODA: "https://18303.live.streamtheworld.com/CRP_MOD.mp3"
};

function getAllAudios(req, res) {
    let query = "select * from audio;";
    db.driver.execQuery(query, [], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                audio: []
            })
        } else {
            res.status(200).send({
                audio: result
            })
        }
    })
}

function getAudio(req, res) {
    let query = "select * from audio where id=?";
    db.driver.execQuery(query, [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'ERROR'
            })
        } else {
            if (!result.length) {
                res.status(404).send({
                    message: 'No existe el audio'
                })
            } else {
                res.status(200).send({
                    message: 'Retornado a un audio',
                    audio: result[0]
                })
            }
        }
    })
}

function getBlob(req, res) {
    let dirname = __dirname;
    let pathFile = path.resolve(__dirname, '../audios', req.params.audio + '.wav');
    res.status(200).sendFile(pathFile, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

Date.prototype.formatString = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
    (hh > 9 ? '' : '0') + hh,
    (mm > 9 ? '' : '0') + mm,
    (ss > 9 ? '' : '0') + ss
    ].join('');
};

function recordAudio(req, res) {
    let today = new Date();
    let filename = today.formatString();
    let duracion = req.body.duracion;
    let hour = duracion.split(':')[0];
    let minute = duracion.split(':')[1];
    let radio = RADIO[req.body.radio];
    let duracionMinutos = 60 * hour + minute;
    let query = "insert into audio(name,location,estado,created_at,duracion) values(?,?,0,now(),?)";
    db.driver.execQuery(query, [req.body.radio, filename, duracionMinutos], function (err) {
        if (err) {
            console.log(err);
            res.send({
                message: 'error'
            })
        } else {
            res.send({
                message: 'enviado'
            })
            const pythonProcess = spawn(process.env.PY_EXE, ["radioscrap.py", filename, radio, hour, minute]);
            pythonProcess.stdout.on('data', (data) => {
                let query = "update audio set estado=1 where location=?";
                db.driver.execQuery(query, [filename], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                })
            });
        }
    })
}

function uploadAudio(req, res) {
    if (!req.files) {
        res.status(400).send({
            message: "no file found"
        })
    } else {
        console.log(req.files.file);
        let pathfile = req.files.file.path;
        let filename = req.files.file.name;
        console.log(process.env.SEPARADOR_PATH);
        console.log(pathfile.split('\\'));
        let serverFileName = pathfile.split('\\')[1].split('.')[0];
        let query = "insert into audio(name,location,estado,created_at,duracion) values(?,?,1,now(),5)";
        db.driver.execQuery(query, [filename, serverFileName], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "error"
                })
            } else {
                res.status(200).send({
                    message: "recorded"
                })
            }
        })
    }
}

function particionar(req, res) {
    let audio = req.params.audio;
    let split = req.query.split;
    let id = req.query.id;
    const pythonProcess = spawn(process.env.PY_EXE, ["splitAudio.py", audio, split]);
    pythonProcess.stdout.on('data', (data) => {
        console.log('done');
        let query = "update audio set estado=2 where location=?";
        db.driver.execQuery(query, [audio], function (err) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "error"
                })
            } else {
                res.status(200).send({
                    message: "particionado"
                });
                let querydrop = "delete from particion where idaudio=?;"
                db.driver.execQuery(querydrop, id, function (err, result) {
                    if (err) {
                        console.log('no pude crear la particion');
                        console.log(err);
                    } else {
                        console.log(result);
                        console.log(id);
                        for (let i = 1; i <= split; i++) {
                            let queryCurrent = "insert into particion(idaudio,numeroparticion,folder,filename,estado,created_at) values(" + id + "," + i + ",'" + audio + "'," + i + "," + "1,now());";
                            db.driver.execQuery(queryCurrent, function (err) {
                                if (err) {
                                    console.log('no pude crear la particion');
                                    console.log(err);
                                } else {
                                    console.log('creado particion', i);
                                }
                            });
                        }
                    }
                });

            }
        })
    });
}

module.exports = {
    getAudio,
    getAllAudios,
    getBlob,
    particionar,
    recordAudio,
    uploadAudio
};
