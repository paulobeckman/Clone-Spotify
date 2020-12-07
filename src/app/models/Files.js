const db = require('../../config/db')

module.exports = {
    create(data){
        const query = `
            INSERT INTO files(
                name,
                path, 
                playlist_id
            )VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.name,
            data.path,
            data.playlist_id
        ] 

        return db.query(query, values)
    }
}