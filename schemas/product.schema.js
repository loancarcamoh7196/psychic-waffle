/**
 * * Schema de validación de Datos de Prodcut
 */
const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().max(50);
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image,
    categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    description,
    image,
    categoryId
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { 
    createProductSchema, 
    updateProductSchema, 
    getProductSchema 
}
