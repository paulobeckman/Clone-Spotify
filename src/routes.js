const { Router } = require('express')
const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const playlist = require('./app/controllers/playlist')

routes.get('/', playlist.index)
routes.post('/', playlist.post)

routes.get('/playlist/:id', playlist.show)
routes.put('/playlist/', multer.array("image", 1), playlist.put)

module.exports = routes