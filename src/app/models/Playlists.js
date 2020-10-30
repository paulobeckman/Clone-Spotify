const db = require ('../../config/db');

module.exports = {
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
    }
}