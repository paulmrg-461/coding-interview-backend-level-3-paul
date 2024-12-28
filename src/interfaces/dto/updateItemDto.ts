import Joi from 'joi';

export const updateItemSchema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    price: Joi.number().min(0).optional(),
}).or('name', 'price'); 
