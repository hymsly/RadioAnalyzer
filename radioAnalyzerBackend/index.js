'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
var orm = require('orm');
var app = require('./app');
var port = 3000;

var database = process.env.DB_NAME;
var user =process.env.DB_USER;
var password = process.env.DB_PASSWORD;
var host = process.env.DB_HOST;
var portmysql = process.env.DB_PORT;

var conexion = 'mysql://'+user+':'+password+'@'+host+':'+portmysql+'/' + database;

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