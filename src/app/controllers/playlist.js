const Playlists = require('../models/Playlists') 
const File = require('../models/Files')
const { files } = require('../models/Playlists')

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
    },
    put(req, res){
        Playlists.update(req.body)

        if(req.files.length = 0){
            req.files.map(file => {
                console.log(file)
                File.create({...file, playlist_id: req.body.id})
            })
        } else {
            File.delete(req.id)
        }
        

        return res.redirect(`playlist/${req.body.id}`)
    }
}