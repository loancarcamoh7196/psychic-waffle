/**
 *  Archivo de manejo de ORM
 * 
 * Conexion a BD con Sequelize
 */

const { Sequelize } = require('sequelize');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize( URI, {
    dialect: 'postgres',
    logging: (...msg) => console.log(msg),
});

module.exports = sequelize;