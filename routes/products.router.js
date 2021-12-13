/**
 * * Enrutador de servicio Productos
 */
const express = require('express');
const ProductsService = require('../services/product.service');
const validationHandler = require('../middlewares/validation.handler');
const {
    createProductSchema, 
    updateProductSchema,
    getProductSchema,
    queryProductSchema 
} = require('../schemas/product.schema');

const router = express.Router();// Llama librería para generar Routing
const service = new ProductsService();

/**
 * * GET /products
 * Obtiene lista  Productos
 */
router.get(
    '/',
    validationHandler(queryProductSchema, 'query'),
    async (req, res, next) => {
        try {
            const products = await service.find(req.query);
            res.json(products);
        } catch (error) {
            return next(error);
        }
    }
);

/**
 * * GET /products/:id
 * Busca un Producto
 */
router.get(
    '/:id',
    validationHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            return next(error);
        }
});

/**
 * * POST  /products
 * Crea Producto
 */
router.post(
    '/', 
    validationHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * PATCH /products/:id 
 * Actualiza algun campo del Producto 
 */
router.patch(
    '/:id', 
    validationHandler(getProductSchema, 'params'),
    validationHandler(updateProductSchema, 'body'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }
);

/**
 * * DELETE /products/:id
 * Elimina producto en especifico
 */
router.delete(
    '/:id',
    validationHandler(getProductSchema, 'params'),
    async (req, res) => {
        const { id } = req.params;
        const rta = await service.delete(id);
        res.json(rta);
    }
);

module.exports = router;
