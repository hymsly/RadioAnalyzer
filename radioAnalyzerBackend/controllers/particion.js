'use strict';

const spawn = require('child_process').spawn;
const path = require('path');

function getAllParticiones(req, res) {
    let idAudio = req.params.idAudio;
    let query = "select * from particion where idaudio=?;";
    db.driver.execQuery(query, [idAudio], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                particiones: []
            })
        } else {
            res.status(200).send({
                particiones: result
            })
        }
    })
}

function analyzarParticion(req, res) {
    let idAudio = req.params.idAudio;
    let idParticion = req.params.idParticion;
    let queryFolder = "select location from audio where id=?;";
    db.driver.execQuery(queryFolder, [idAudio], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'error'
            })
        } else {
            let letFolder = result[0].location;
            console.log(letFolder);
            const pythonProcess = spawn(process.env.PY_EXE, ["evaluate.py", letFolder, idParticion]);
            pythonProcess.stdout.on('data', (data) => {
                let clase = data.toString('utf8');
                console.log(clase);
                let queryComplete = "update particion set estado=2, clase=? where id=?";
                db.driver.execQuery(queryComplete, [clase, idParticion], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            message: 'error al actualizar la particion'
                        })
                    } else {
                        console.log(clase);
                        res.status(200).send({
                            message: 'analizado',
                            clase: clase
                        })
                    }
                });

            });
        }
    })

}

module.exports = {
    getAllParticiones,
    analyzarParticion
};