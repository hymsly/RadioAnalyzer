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



module.exports = {
    getAllParticiones
};