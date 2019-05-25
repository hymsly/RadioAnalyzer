'use strict';

var express = require('express');
var AudioController = require('../controllers/audio');

var api = express.Router();
api.get('/audio', AudioController.getAllAudios);
api.get('/audio/record', AudioController.recordAudio);
api.get('/audio/:id', AudioController.getAudio);
api.get('/audio/download/:audio', AudioController.getBlob);

module.exports = api;