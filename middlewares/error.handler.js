/**
 * Archivo Contenedor de manajadores de Errores
 * **** Importante
 * ***** El orden de uso de los handlerError debe ser cuidadaso, ya sobre pone uno sobre
 * ***** la descripción del error
 * 
 * *** Orden correcto
 * 1.- logErrors
 * 2.- ormErrorHandler
 * 3.- boomErrorHabdler 
 * 4.- errorHandler
 */
const { ValidationError } = require('sequelize');


/**
 * Función que muestra error en consola
 * @param {*} err Error
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Siguiente
 */
const logErrors = (err, req, res, next) =>{
    console.error(err);
    next(err);
}

const errorHandler = (err, req, res, next) => {
    // console.log(`*****  status code: ${err}  ****`)
    res.status(500).json({
        statusCode: 500,
        message: err.message,
        stack: err.stack,
    });
    next(err);
}

const ormErrorHandler= (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
        });
    }
    next(err);
}

const boomErrorHandler = (err, req, res, next) => {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = { logErrors, errorHandler, ormErrorHandler,boomErrorHandler }