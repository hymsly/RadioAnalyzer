'use strict';

var express = require('express');
var AudioController = require('../controllers/audio');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './audios' });

var api = express.Router();
api.get('/audio', AudioController.getAllAudios);
api.get('/audio/:id', AudioController.getAudio);
api.get('/audio/download/:audio', AudioController.getBlob);
api.post('/audio/record', AudioController.recordAudio);
api.post('/audio/upload', multipartMiddleware, AudioController.uploadAudio);

module.exports = api;