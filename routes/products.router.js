const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();// Llama librería para generar Routing
const service = new ProductsService();

/**
 * GET Obtiene Productos
 */
router.get('/', async (req, res) => {
    const { size } = req.query; 
    const limit = size || 10;
    const products = await service.find();
    res.json(products);
});

/**
 * GET Busca un Producto
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
});

/**
 * POST Crea Producto
 */
router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

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
router.patch('/:id', async (req, res) => {
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
    
});

/**
 * DELETE Elimina producto en especifico
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
});

module.exports = router;