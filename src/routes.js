const express = require('express')
const routes = express.Router()

const playlist = require('./app/controllers/playlist')

routes.get('/', function(req,res){
    return res.render("home.njk")
})

routes.post('/', playlist.post)

module.exports = routes