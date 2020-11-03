const express = require('express')
const routes = express.Router()

const playlist = require('./app/controllers/playlist')

routes.get('/', playlist.index)
routes.post('/', playlist.post)

routes.get('/playlist/:id', playlist.show)

module.exports = routes