/**
 * * Archivo de Main de configuracion de Rutas
 */
const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customerRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

const routerApi = (app) => {
    const router = express.Router();

    app.get('/', (req, res) => {
        res.send('Mi tienda en express');
    });

    app.use('/api/v1',router);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/customers', customerRouter);
    router.use('/orders', ordersRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
};

module.exports = routerApi;
