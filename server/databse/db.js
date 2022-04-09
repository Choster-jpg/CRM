const {Sequelize} = require('sequelize');
const config = require('../default.json');

module.exports = new Sequelize
(
    config.database.DB_NAME,
    config.database.DB_USER,
    config.database.DB_PASSWORD,
    {
        dialect: "postgres",
        host: config.database.DB_HOST,
        port: config.database.DB_PORT
    }
)