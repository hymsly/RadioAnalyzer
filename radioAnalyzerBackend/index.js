'use strict';

var orm = require('orm');
var app = require('./app');
var port = 3000;
var database = 'radioanalyzer'

var conexion = 'mysql://root:himansly97@127.0.0.1:3306/' + database;

function servidor() {
    app.listen(port, () => {
        console.log('servidor listo');
    })
}

global.db = orm.connect(conexion);
db.on('connect', function (err) {
    if (err) {
        throw err;
    } else {
        console.log('conexion exitosa');
        servidor();
    }
});