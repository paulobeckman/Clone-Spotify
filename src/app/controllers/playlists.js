const Playlists = require('../models/Playlists')
const File = require('../models/Files')

module.exports ={
    async index(req, res){
        const resultsAllPlaylists = await Playlists.all()
        const playlists = resultsAllPlaylists.rows

        const resultsAllFiles = await File.all()

        const playListsWithFileSrc = playlists.map(playlist => {
            const file = resultsAllFiles.rows.find(file => file.playlist_id === playlist.id);
            
            if(file){
                return {...playlist, filesrc: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`};
            }

            return {...playlist}
        });

        return res.render("pages/playlists", {playlists: playListsWithFileSrc})
    }
}