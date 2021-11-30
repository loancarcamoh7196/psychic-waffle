const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');

class UserService {
    constructor() {
        this.pool = pool;
        this.pool.on('error', (err) => console.error(err));
    }

    async create(data) {
        return data;
    }

    async find() {
        const rta = await pool.query('SELECT * FROM task');
        return rta.rows;
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

module.exports = UserService;