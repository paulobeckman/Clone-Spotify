const Playlists = require('../models/Playlists')
const Files = require('../models/Files')

module.exports = {
    async index(req, res){
        const {filter} = req.query

        const filterResults =  await Playlists.finBy(filter)
        const playlists = filterResults.rows

        const playlistFiles =  playlists.map(playlist => {

            if(playlist.path){
                return{...playlist, filesrc: `${req.protocol}://${req.headers.host}${playlist.path.replace("public","")}`}
            }

            return{...playlist}
        })

        return res.render("pages/search", {playlists: playlistFiles})
    }
}