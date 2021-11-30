/**
 * Librería de Conexion con PostgreSQL 
 * 
 * Maneja concxiones con un Pool
 * API con  [Docker] - [PostgreSQL]
 * 
 */
const { Pool } = require('pg');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const pool  = new  Pool ({ connectionString: URI });



module.exports = pool;