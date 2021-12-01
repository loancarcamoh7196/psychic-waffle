/**
 *  Archivo de manejo de ORM
 * 
 * Conexion a BD con Sequelize
 */

const { Sequelize } = require('sequelize'); 
const { config } = require('../config'); // Configuración de Variables de Entorno
const setupModels = require('../db/models'); // Pool de modelo BD

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize( URI, {
    dialect: 'postgres',
    logging: (...msg) => console.log(msg),
});

setupModels(sequelize); // Crea todas las tables declaradas en pool de modelos
sequelize.sync(); // Actualiza y revisa el contenido de bd 


module.exports = sequelize;