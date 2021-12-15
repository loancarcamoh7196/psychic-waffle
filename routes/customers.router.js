/**
 * * Enrutador de servicio Customer
 */
const express = require('express');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validation.handler');
const {
    createCustomerSchema,
    getCustomerSchema,
    updateCustomerSchema
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

/**
 * * GET /customers
 * Otiene lista Customers
 */
router.get(
    '/', async (req, res, next) => {
        try {
            res.json(await service.find());
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * POST /customers/
 * Crea un Cliente
 */
router.post(
    '/',
    validationHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch (error) {
                next(error);
        }
    }
);

/**
 * * PATCH /customers/:id
 * Actualiza algun campo de un Cliente
 */
router.patch(
    '/:id',
    validationHandler(getCustomerSchema, 'params'),
    validationHandler(updateCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * DELETE /customers/:id
 * Elimina registro de un Cliente especifico
 */
router.delete(
    '/:id',
    validationHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.status(200).json(await service.delete(id));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
