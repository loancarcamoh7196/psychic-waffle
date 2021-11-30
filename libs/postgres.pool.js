/**
 * Librería de Conexion con PostgreSQL 
 * 
 * Maneja concxiones con un Pool
 * API con  [Docker] - [PostgreSQL]
 * 
 */
const { Pool } = require('pg');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbHost);
const PASSWORD = encodeURIComponent(config.database);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const pool  = new  Pool ({ connectionString: URI });



module.exports = pool;