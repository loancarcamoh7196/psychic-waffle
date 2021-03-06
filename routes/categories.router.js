/**
 * * Enrutador de servicio Categoria
 */
const express = require('express');

const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validation.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

/**
 * * GET /categories
 * Obtiene lista de Categorias
 */
router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

/**
 * * GET /categories/:id
 *  Busca una Categoria
 */
router.get(
    '/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * POST /categories
 * Crea Categoria
 */
router.post(
    '/',
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * PATCH /categories/:id
 * Actualiz algun campo de una categoria
 */
router.patch(
    '/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * DELETE /categories:id
 * Actualiza algun campo de la Categoria
 */
router.delete(
    '/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
