const db = require ('../../config/db');

module.exports = {
    all(callback){
        db.query(`SELECT * FROM playlists`, function(err, results){
            if(err) throw `Erro dataBase ${err}`

            callback(results.rows)
        })
    },
    create(data) {
        const query = `
            INSERT INTO playlists (
                name
            ) VALUES ($1)
            RETURNING id
        `

        const values = [
            data.name
        ]

        return db.query(query, values)
    },
    find(id){
        return db.query(`
        SELECT * 
        FROM playlists
        WHERE id = $1`, [id])
    },
    update(data){
        const query = `
            UPDATE playlists SET 
                name = ($1),
                description = ($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.description,
            data.id
        ]

        return db.query(query, values)
    },
    files(id){
        return db.query(`
            SELECT * 
            FROM files
            WHERE playlist_id = $1`, [id]) 
    }
}