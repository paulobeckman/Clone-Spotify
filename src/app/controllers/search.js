const Playlists = require('../models/Playlists')
const Files = require('../models/Files')

module.exports = {
    async index(req, res){
        const {filter} = req.query

        const filterResults =  await Playlists.finBy(filter)
        const playlists = filterResults.rows

        const playlistFiles =  playlists.map(playlist => {
            return{...playlist, filesrc: `${req.protocol}://${req.headers.host}${playlist.path.replace("public","")}`}
        })

        // let playlist = []
        
        // for(let i=0; i<playlists.length;i++){
        //     const playlistFilesResults = await Files.find(playlists[i].id)
        //     const [playlistFiles] = playlistFilesResults.rows
            
        //     playlist.push({
        //         ...playlists[i],
        //         filesrc: `${req.protocol}://${req.headers.host}${playlistFiles.path.replace("public","")}`
        //     })
        // }
        
        // console.log(playlist)

        console.log(playlistFiles)

        return res.render("pages/search", {playlists: playlistFiles})
    }
}