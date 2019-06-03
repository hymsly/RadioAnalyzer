'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var AudioRoutes = require('./routes/audio');

//bodyParser middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//frontend
app.use(express.static(path.join(__dirname, 'client')));

//rutas base
app.use('/api', AudioRoutes);

module.exports = app;