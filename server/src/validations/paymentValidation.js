import Joi from 'joi';

export const createOrder = {
  body: Joi.object({
    email: Joi.string().email().required(),
    amount: Joi.number().positive().required(),
    planType: Joi.string().required(),
    referralCode: Joi.string().optional().allow(null, ""),
  }),
};

export const verifyPayment = {
  body: Joi.object({
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
  }),
};