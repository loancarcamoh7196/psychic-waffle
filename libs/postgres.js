/**
 * Librería de Conexion con PostgreSQL
 * API con  [Docker] - [PostgreSQL]
 */
const { Client } = require('pg');

async function getConnection(){
    const client  = new  Client ({
        host: 'localhost',
        port: 5432,
        user: 'lorena',
        password: 'admin123',
        database: 'my_store'
    });
    
    await client.connect();
}

module.exports = getConnection;