const Joi = require('joi')

const id = Joi.string().uuid();
const email = Joi.string().email();
const name = Joi.string().min(3).max(25);
const lastname = Joi.string().min(3);