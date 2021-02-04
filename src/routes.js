const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const playlist = require('./app/controllers/playlist')
const search = require('./app/controllers/search')
const home = require('./app/controllers/home')

routes.get('/', function(req,res){
    return res.redirect("/home")
})

//Home
routes.get('/home', home.index)

//Playlist
routes.get('/playlist/:id', playlist.show)

routes.post('/', playlist.post)
routes.put('/playlist', multer.array("image", 1), playlist.put)
routes.delete('/playlist', playlist.delete)


//Search
routes.get('/search', search.index)

module.exports = routes