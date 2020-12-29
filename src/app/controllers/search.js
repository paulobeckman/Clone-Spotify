const Playlists = require('../models/Playlists')

module.exports = {
    async index(req, res){
        const {filter} = req.query

        const filterResults =  await Playlists.finBy(filter)
        const playlists = filterResults.rows
        
        return res.render("pages/search", {playlists})
    }
}