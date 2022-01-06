/**
 * * Servicio / controlador de Authentication
 * 
 * Servicio Encargado de Autenticación de usuario de la plataforma
 */
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
    /**
     * Método encargado de Loggear usuario
     * @param {string} email Email de Login
     * @param {strin} password Contraseña
     */
    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        //Comprobación Contraseña
        const isMatch = await bcrypt.compare( password, user.password );
        if (!isMatch) {
            throw boom.unauthorized();
        }

        delete user.dataValues.password;
        return user;
    }

    /**
     * Agrega a usuario loggeado su token
     * @param {Obejct} user Usuario loggeado
     * @returns Objacto usario y su token de conexión
     */
    signToken(user){
        const payload = { sub: user.id, role: user.role };
        const token = jwt.sign(payload, config.jwtSecret);

        return { user, token };
    }

    /**
     * Envia Correo con link para cambiar contrseña
     * @param {String} email Emial de usuario
     */
    async sendRecovery(email) {
        const user = await service.findByEmail(email);

        if (!user) {
            throw boom.forbidden();
        }

        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.mailRecoveryToken, {expiresIn: '15min'});
        const link = `http://misito.cl/recovery?token=${token}`;
        await service.update(user.id, {recoveryToken: token});


        const mail = {
            from: 'lenac96@gmail.com', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Registra nueva contraseña', // Subject line
            html: `Ingresa a este link para <a href="${link}">resetear contraseña</a>.
                   <br> Recuerda que solo puedes realizar esta operación durante 15 minutos. 
                   <br> Luego tendras que solicitar nuevemente tu cambio de contraseña ` // html body
        };
        await this.sendMail(mail);
    }

    async changePassword( token, newPassword){
        try {
            const payload = jwt.verify(token, config.mailRecoveryToken);
            const user = await service.findOne(payload.sub);

            if(user.recoveryToken !== token) {
                throw boom.unauthorized();
            } else {
                const hash = await bcrypt.hash(newPassword, 10);

                service.update(user.id, { password: hash, recoveryToken: null });
                return { message: 'Contraseña cambiada con exito!'}
            }
        } catch (error) {
            throw boom.unauthorized()
        }
    }
    
    /**
     * Envia todo tipos de emial
     * @param {obj} infoMail Elementos que debe contener from, to, subject, html
     * @returns message
     */
    async sendMail(infoMail){
        //configuración de Mailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true, // true for 465, false for other ports
            port: 465,
            auth: {
                user: config.mailUser,
                pass: config.mailPassword
            }
        });

        await transporter.sendMail(infoMail);

        return { message: 'mail sent! ;)' };
    }
}

module.exports = AuthService;