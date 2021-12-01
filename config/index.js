/**
 * Archivo de Manejo de Variables de Entorno
 */
require('dotenv').config();

const config = {
    env: process.env.ENV || 'dev',
    port: process.env.API_PORT || 3000,
    dbName:  process.env.DB_NAME,
    dbHost:  process.env.DB_HOST,
    postgres: {
        dbUser:  process.env.PG_USER,
        dbPassword:  process.env.PG_PASSWORD,
        dbHost:  process.env.PG_HOST,
        dbName:  process.env.PG_DATABASE,
        dbPort:  process.env.PG_PORT,
    },

    mysql: {
        dbUser:  process.env.MYSQL_USER,
        dbPassword:  process.env.MYSQL_PASSWORD,
        dbHost:  process.env.PG_HOST,
        dbName:  process.env.DB_NAME,
        dbPort:  process.env.MYSQL_PORT,
    }
}

module.exports = { config };