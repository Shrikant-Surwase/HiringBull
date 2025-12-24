import Joi from 'joi';

export const createOrder = {
    body: Joi.object().keys({
        // Generic amount field might still be useful, or we might depend on planId
        amount: Joi.number().min(1).optional(),
        userId: Joi.string().uuid().required()
    }),
};

export const verifyPayment = {
    body: Joi.object().keys({
        receipt: Joi.string().optional(),
        platform: Joi.string().valid('ios', 'android').optional(),
        productId: Joi.string().optional(),
        userId: Joi.string().uuid().optional()
    }),
};
