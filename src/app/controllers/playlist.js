const Playlists = require('../models/Playlists') 
const File = require('../models/Files')
const fs = require('fs')

module.exports = {
    async post(req, res){ 
        const key = Object.keys(req.body)

        if(req.body[key] == ""){
            return res.send('Por Favor, preencha todos os campos!')
        }

        await Playlists.create(req.body)

        console.log(req.body)
        return res.redirect('/')
    },
    async show(req, res){
        const resultsPlaylist = await Playlists.find(req.params.id)
        const playlist = resultsPlaylist.rows[0]

        //pegando todas as playlists para a lista de playlist na barra lateral 
        const resultsAllPlaylists = await Playlists.all()
        const playlists = resultsAllPlaylists.rows

        const resultsFile = await File.find(req.params.id)
        
        if (resultsFile.rows.length == 0){
            return res.render("pages/playlist", {playlist})
        }

        const files = {
            ...resultsFile,
            src: `${req.protocol}://${req.headers.host}${resultsFile.rows[0].path.replace("public", "")}` 
        }

        return res.render("pages/playlist", {playlist, files, playlists})

    },
    async put(req, res){

       await Playlists.update(req.body)

       if(req.files.length == 0){
            return res.redirect(`playlist/${req.body.id}`)
       }
       
        const resultsFile  = await File.find(req.body.id)
        const file = resultsFile.rows[0]

        if(resultsFile.rows.length == 0){
            await req.files.map(file => {
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
    },
    async delete(req, res){
        const PlaylistId = req.body.id

        const resultsFile  = await File.find(PlaylistId)
        const file = resultsFile.rows[0]

        if(file){
            fs.unlinkSync(file.path)
            await File.delete(PlaylistId)
        }
        
        await Playlists.delete(PlaylistId)      
        
        return res.redirect("/")
    }
}