const { Pool } = require('pg')

module.exports = new Pool ({
    user: 'postgres',
    password:'paulo',
    host: "localhost",
    port: "5432",
    database: "spotify"
})