const Playlists = require('../models/Playlists') 

module.exports = {
    index(req,res){
        Playlists.all(function(playlists){
            return res.render("pages/home", {playlists})
        })

    },
    post(req, res){
        const key = Object.keys(req.body)

        if(req.body[key] == ""){
            return res.send('Por Favor, preencha todos os campos!')
        }

        Playlists.create(req.body)
        return res.redirect('/')
    },
    async show(req, res){
        let results = await Playlists.find(req.params.id)
        const playlist = results.rows[0]

        return res.render("pages/playlist", {playlist})
    }
}