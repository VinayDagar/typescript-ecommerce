import { validate, Joi } from "express-validation"

const signupValidation: any = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .min(10)
            .required(),
        password: Joi.string()
            .min(6).max(25)
            .required(),
        name: Joi.string()
            .min(3)
            .required()
    })
};

const loginValidation: any = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6).max(25)
            .required(),
    })
};

const createProductValidation: any = {
    body: Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
            .min(150).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
    })
}


export default {
    signupValidation,
    loginValidation,
    createProductValidation
}
