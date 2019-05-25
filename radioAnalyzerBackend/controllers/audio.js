'use strict';

const spawn = require('child_process').spawn;
var audioModel = require('../models/audio');
const path = require('path');



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
    const pythonProcess = spawn("py", ["radioscrap.py", filename]);
    pythonProcess.stdout.on('data', (data) => {
        let query = "insert into audio(name,location,estado,created_at) values(?,?,1,now())";
        db.driver.execQuery(query, [filename, filename], function (err, result) {
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
    });
}

module.exports = {
    getAudio,
    getAllAudios,
    getBlob,
    recordAudio
};