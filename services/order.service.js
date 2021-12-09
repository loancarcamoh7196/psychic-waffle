/**
 * * Servicio / Controlador de Order
 */
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

    constructor(){ }
    
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

module.exports = OrderService;