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
let options= {};
if (config.isProd) {
    options = {
        dialect: 'postgres',
        native: true,
        logging: false,
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    };

} else {
    options = {
        dialect: 'postgres',
        logging: console.log
    };
}

console.log(config.dbUrl);
// console.log(URI);
console.log(options, '  \n');

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize); // Crea todas las tables declaradas en pool de modelos
// sequelize.sync(); // Actualiza y revisa el contenido de bd - Apto solo para ambiente de desarrollo


module.exports = sequelize;