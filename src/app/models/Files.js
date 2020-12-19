const db = require('../../config/db')

module.exports = {
    all(){
        try{
            return db.query(`SELECT * FROM files`)

        }catch(err){
            console.error(err)
        }
    },
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
            data.filename,
            data.path,
            data.playlist_id
        ] 

        return db.query(query, values)
    },
    find(id){
        return db.query(`
            SELECT * 
            FROM files
            WHERE playlist_id = $1`, [id])
    },
    delete(id){
        db.query(`
        DELETE 
        FROM files 
        WHERE playlist_id = $1`, [id])
    }
}