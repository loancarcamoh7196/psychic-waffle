/**
 *  Archivo de manejo de ORM
 * 
 * Conexion a BD con Sequelize
 */

const { Sequelize } = require('sequelize'); 
const { config } = require('../config'); // Configuración de Variables de Entorno
const setupModels = require('../db/models'); // Pool de modelo BD

const USER = encodeURIComponent(config.postgres.dbUser);
const PASSWORD = encodeURIComponent(config.postgres.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.postgres.dbPort}/${config.dbName}`;


// const USER = encodeURIComponent(config.mysql.dbUser);
// const PASSWORD = encodeURIComponent(config.mysql.dbPassword);
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.mysql.dbPort}/${config.dbName}`;



const sequelize = new Sequelize( URI, {
    dialect: 'postgres', /* Cambiar esta linea y comentar  USER  ; PASSWORD ; URI */
    // logging: (...msg) => console.log(msg),
    logging: console.log(),
});

setupModels(sequelize); // Crea todas las tables declaradas en pool de modelos
// sequelize.sync(); // Actualiza y revisa el contenido de bd - Apto solo para ambiente de desarrollo


module.exports = sequelize;