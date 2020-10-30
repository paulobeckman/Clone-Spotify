const Playlists = require('../models/Playlists') 

module.exports = {
    post(req, res){
        const key = Object.keys(req.body)

        if(req.body[key] == ""){
            return res.send('Por Favor, preencha todos os campos!')
        }

        let results = Playlists.create(req.body)
        const PlaylistId = results.rows[0].id

        console.log(req.body)

        return res.redirect('/')

    }
}