const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().max(50);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { 
    createProductSchema, 
    updateProductSchema, 
    getProductSchema 
}
