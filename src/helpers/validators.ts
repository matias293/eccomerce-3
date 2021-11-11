import Joi from 'joi'

export const schemaAuth = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    repeat_password: Joi.ref('password'),
    nombre:Joi.string().required(),
    direccion:Joi.string().min(5).required(),
    edad:Joi.number().required(),
    telefono:Joi.string().length(10).pattern(/^[0-9]+$/).required()
    }).with('password', 'repeat_password');

export const schemaAddProduct = Joi.object({
    nombre:Joi.string().trim().required(),
    precio:Joi.number().required(), 
    descripcion:Joi.string().min(2).required(),
    codigo:Joi.string().required(),
    foto:Joi.string().required(),
    stock:Joi.number().required()
})

export const schemaUpdateProduct = Joi.object({
    nombre:Joi.string().trim(),
    precio:Joi.number(), 
    descripcion:Joi.string().min(2),
    codigo:Joi.string(),
    foto:Joi.string(),
    stock:Joi.number()
})