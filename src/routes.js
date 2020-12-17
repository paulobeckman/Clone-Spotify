const { Router } = require('express')
const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const playlist = require('./app/controllers/playlist')

routes.get('/', playlist.index)
routes.get('/playlist/:id', playlist.show)

routes.post('/', playlist.post)
routes.put('/playlist', multer.array("image", 1), playlist.put)
routes.delete('/playlist', playlist.delete)

module.exports = routes