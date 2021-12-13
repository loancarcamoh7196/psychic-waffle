/**
 * * Enrutador de servicio de Usuario
 */
const express = require('express');

const UserService = require('../services/user.service'); // Controlador/Servicio asociado a User
const validatorHandler = require('../middlewares/validation.handler'); // Manejador de Errores
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/user.schema'); // Schema de validación de Datos

const router = express.Router(); // Manejador de Rutas
const service = new UserService(); 

/**
 * Ruta GET /users
 * Lista todos los usuarios 
 */
router.get(
    '/',
    async (req, res, next) => {
        try {
            const users = await service.find();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Ruta GET /users/:id
 * Obtien info de un usario especificado por ID
 */
router.get(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
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
 * Ruta POST /users
 * Agrega nuevo usuario
 */
router.post(
    '/',
    validatorHandler(createUserSchema, 'body'),
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
 * Ruta PATCH /users/:id
 * Realiza cambios a usuario especificaco por ID
 */
router.patch(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
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
 * Ruta DELETE /users/:id
 * Elimina usario especificado por ID
 */
router.delete(
    '/:id',
    validatorHandler(getUserSchema, 'params'),
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
