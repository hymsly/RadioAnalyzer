'use strict';

var express = require('express');
var AudioController = require('../controllers/particion');

var api = express.Router();
api.get('/particion/:idAudio', AudioController.getAllParticiones);
api.get('/particion/:idAudio/analyzar/:idParticion', AudioController.analyzarParticion);
/*api.get('/audio/download/:audio', AudioController.getBlob);
api.get('/audio/particionar/:audio', AudioController.particionar);
api.post('/audio/record', AudioController.recordAudio);
api.post('/audio/upload', multipartMiddleware, AudioController.uploadAudio);*/

module.exports = api;