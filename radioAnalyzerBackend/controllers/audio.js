'use strict';

var audioModel = require('../models/audio');
const path = require('path');
function getAllAudios(req, res) {
    let query = "select * from audio;";
    db.driver.execQuery(query, [], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error del Sistema'
            })
        } else {
            res.status(200).send({
                message: 'Retornando todos los audios',
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
    let pathFile = path.resolve(__dirname, '../../audios', req.params.audio + '.wav');
    console.log(pathFile);
    res.sendFile(pathFile, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    getAudio,
    getAllAudios,
    getBlob
};