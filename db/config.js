/**
 * Configuarcion de Migraciones de Sequelize ORM
 */

const { config } = require('../config'); // Configuración de Variables de Entorno


// Configuración para postgreSQL
const USER = encodeURIComponent(config.postgres.dbUser);
const PASSWORD = encodeURIComponent(config.postgres.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.postgres.dbPort}/${config.dbName}`;

//Configuración para MySQL
// const USER = encodeURIComponent(config.mysql.dbUser);
// const PASSWORD = encodeURIComponent(config.mysql.dbPassword);
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.mysql.dbPort}/${config.dbName}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production : {
        url: URI,
        dialect: 'postgres',
    }
}
