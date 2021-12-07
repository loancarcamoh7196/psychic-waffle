/**
 * Servicio / Controlador de Customer
 */
const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');

class CategoryService {

    constructor(){
        this.pool = pool;
        this.pool.on('error', (err) => console.error(err));
    }

    async create(data) {
        return data;
    }

    async find() {
        return [];
    }

    async findOne(id) {
        return { id };
    }

    async update(id, changes) {
        return {
            id,
            changes,
        };
    }

    async delete(id) {
        return { id };
    }

}

module.exports = CategoryService;