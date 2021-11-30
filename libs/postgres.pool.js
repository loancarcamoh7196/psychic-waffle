/**
 * Librería de Conexion con PostgreSQL 
 * 
 * Maneja concxiones con un Pool
 * API con  [Docker] - [PostgreSQL]
 * 
 */
const { Pool } = require('pg');


const pool  = new  Pool ({
    host: 'localhost',
    port: 5432,
    user: 'lorena',
    password: 'admin123',
    database: 'my_store'
});



module.exports = pool;