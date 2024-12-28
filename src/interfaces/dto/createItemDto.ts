import Joi from 'joi';

export const createItemSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    price: Joi.number().min(0).required(),
});