const express = require('express');
const passport = require('passport');

const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();

/**
 * * POST /auth/login
 */
router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

/**
 * * POST /auth/recovery
 */
router.post(
    '/recovery',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const rta = await service.sendMail(email);
            res.json(rta);
        } catch (error) {
            next(error);
        }
});

module.exports = router;
