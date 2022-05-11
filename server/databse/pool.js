const Pool = require('pg').Pool;
const config = require('../default.json');

module.exports = new Pool(
    {
                user: config.database.DB_USER,
                host: config.database.DB_HOST,
                database: config.database.DB_NAME,
                password: config.database.DB_PASSWORD,
                port: config.database.DB_PORT
            }
);