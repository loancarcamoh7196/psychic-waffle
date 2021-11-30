require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.API_PORT || 3000,
    dbUser:  process.env.PG_USER,
    dbPassword:  process.env.PG_PASSWORD,
    dbHost:  process.env.PG_HOST,
    dbName:  process.env.PG_NAME,
    dbPort:  process.env.PG_PORT,
}

module.exports = { config };