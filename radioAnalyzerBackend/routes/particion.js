'use strict';

var express = require('express');
var AudioController = require('../controllers/particion');

var api = express.Router();
api.get('/particion/:idAudio', AudioController.getAllParticiones);
/*api.get('/audio/:id', AudioController.getAudio);
api.get('/audio/download/:audio', AudioController.getBlob);
api.get('/audio/particionar/:audio', AudioController.particionar);
api.post('/audio/record', AudioController.recordAudio);
api.post('/audio/upload', multipartMiddleware, AudioController.uploadAudio);*/

module.exports = api;