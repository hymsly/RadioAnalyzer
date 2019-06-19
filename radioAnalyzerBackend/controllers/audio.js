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

    let query = "insert into audio(name,location,estado,created_at) values(?,?,0,now())";
    db.driver.execQuery(query, [req.body.radio, filename], function (err) {
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
        let serverFileName = pathfile.split('/')[1].split('.')[0];
        let query = "insert into audio(name,location,estado,created_at) values(?,?,1,now())";
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
module.exports = {
    getAudio,
    getAllAudios,
    getBlob,
    recordAudio,
    uploadAudio
};
