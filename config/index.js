/**
 * Archivo de Manejo de Variables de Entorno
 */
require('dotenv').config();

const config = {
    env: process.env.ENV || 'dev',
    isProd: process.env.ENV === 'production',
    port: process.env.PORT || 3000,
    dbName:  process.env.DB_NAME,
    dbHost:  process.env.DB_HOST,
    dbUrl: process.env.DATABASE_URL,
    postgres: {
        dbUser:  process.env.PG_USER,
        dbPassword:  process.env.PG_PASSWORD,
        dbPort:  process.env.PG_PORT,
    },

    mysql: {
        dbUser:  process.env.MYSQL_USER,
        dbPassword:  process.env.MYSQL_PASSWORD,
        dbPort:  process.env.MYSQL_PORT,
    }
}

module.exports = { config };