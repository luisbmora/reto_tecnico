import { Joi } from 'celebrate';

export const Uservalidator = {
    getUser:{
        params:{
            id: Joi.number().integer().min(1).required().messages({
                'number.base': 'ID must be an integer.',
                'number.min': 'ID must be at least 1.',
                'any.required': 'ID is required.',
              }),
        },
    },
    getAll:{
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1).messages({
              'number.base': 'Page number must be an integer.',
              'number.min': 'Page number must be at least 1.',
            }),
            limit: Joi.number().integer().min(1).default(10).messages({
              'number.base': 'Limit must be an integer.',
              'number.min': 'Limit must be at least 1.',
            }),
            name: Joi.string().optional().messages({
              'string.base': 'Name must be a string.',
            }),
          }),
    },
    saveUser:{
        body: Joi.object({
            name: Joi.string().min(1).required().messages({
                'string.min': 'Name must have at least 1 character.',
                'any.required': 'Name is required.',
            }),
            password: Joi.string().min(6).max(120).required().messages({
                'string.min': 'Password must be at least 6 characters long.',
                'string.max': 'Password must not exceed 120 characters.',
                'any.required': 'Password is required.',
            }),
        })
    },
    login:{
        body: Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'A valid email address is required.',
                'any.required': 'Email is required.',
            }),
            password: Joi.string().min(6).max(120).required().messages({
                'string.min': 'Password must be at least 6 characters long.',
                'string.max': 'Password must not exceed 120 characters.',
                'any.required': 'Password is required.',
            }),
        })
    }
}
