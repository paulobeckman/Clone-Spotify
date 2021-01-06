const db = require ('../../config/db');

module.exports = {
    all(){
        try{
            return db.query(`SELECT * FROM playlists`)
            
        } catch(err){
            console.error(err)
        }
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
    finBy(filter){
        try {
            return db.query(`
                SELECT p.id, p.name, p.description, f.path
                FROM playlists p
                LEFT JOIN files f
                ON p.id = f.playlist_id
                WHERE p.name ILIKE '%${filter}%'`
            )
        } catch(err) {
            console.error(err)
        }
        
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
    },
    delete(id){
        return db.query(`
            DELETE 
            FROM playlists 
            WHERE id = $1`, [id]
        )
    }
}