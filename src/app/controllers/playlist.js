const Playlists = require('../models/Playlists') 
const File = require('../models/Files')
const fs = require('fs')

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
        const resultsPlaylist = await Playlists.find(req.params.id)
        const playlist = resultsPlaylist.rows[0]

        const resultsFile = await File.find(req.params.id)
        
        if (resultsFile.rows.length == 0){
            return res.render("pages/playlist", {playlist})
        }

        const files = {
            ...resultsFile,
            src: `${req.protocol}://${req.headers.host}${resultsFile.rows[0].path.replace("public", "")}` 
        }

        return res.render("pages/playlist", {playlist, files})

    },
    async put(req, res){
        Playlists.update(req.body)
        
        const resultsFile  = await File.find(req.body.id)
        const file = resultsFile.rows[0]

        if(resultsFile.rows.length == 0){
            req.files.map(file => {
                File.create({...file, playlist_id: req.body.id})
            }) 

            return res.redirect(`playlist/${req.body.id}`)
        }

        fs.unlinkSync(file.path)
        File.delete(req.body.id)

        await req.files.map(file => {
            File.create({...file, playlist_id: req.body.id})
        }) 

        return res.redirect(`playlist/${req.body.id}`)
    }
}