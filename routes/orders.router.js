/**
 * * Servicio / Controlador de Order
 */
const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validation.handler');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

/**
 * * GET /orders
 */
router.get(
    '/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOne(id);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * POST /orders
 */
router.post(
    '/',
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newOrder = await service.create(body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);
/**
 *  * POST /orders/add-item
 *  
 */
router.post('/add-item', 
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newItem = await service.addItem(body);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }    
);

module.exports = router;
