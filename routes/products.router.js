const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();// Llama librería para generar Routing
const service = new ProductsService();

/**
 * GET Obtiene Productos
 */
router.get('/', (req, res) => {
    const { size } = req.query; 
    const limit = size || 10;
    const products = service.find();
    res.json(products);
});

/**
 * GET Busca un Producto
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    res.json(product);
});

/**
 * POST Crea Producto
 */
router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);

    res
        .status(201)
        .json({
            'message': 'Products successful created',
            'data': newProduct
        });
});

/**
 * PATCH Actualiza algun campo del Producto 
 */
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
});

/**
 * DELETE Elimina producto en especifico
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const rta = service.delete(id);
    res.json(rta);
});

module.exports = router;