import { Joi } from "celebrate";
import { getEnterprise } from '../handlers/enterprise.handler';

export const EnterpriseValidator = {
    getEnterprise: {
        params: {
            id: Joi.number().integer().min(1).required().messages({
                'number.base': 'ID must be an integer.',
                'number.min': 'ID must be at least 1.',
                'any.required': 'ID is required.',
              }),
        },
    },
     getEnterprises: {
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

    saveEnterprise: {
        body: Joi.object({
            name: Joi.string().min(1).required().messages({
                'string.min': 'Name must have at least 1 character.',
                'any.required': 'Name is required.',
            }),
            date: Joi.date().required().messages({
                'date.base': 'Date must be a valid date.',
                'any.required': 'Date is required.',
            }),
            type: Joi.string().min(1).required().messages({
                'string.min': 'Type must have at least 1 character.',
                'any.required': 'Type is required.',
            }),
            comments: Joi.string().optional().messages({
                'string.base': 'Comments must be a string.',
            }),
            favorite: Joi.string().optional().messages({
                'string.base': 'Favorite must be a string.',
            }),
        }),
    },

    updateEnterprise: {
        body: Joi.object({
            name: Joi.string().min(1).required().messages({
                'string.min': 'Name must have at least 1 character.',
                'any.required': 'Name is required.',
            }),
            date: Joi.date().required().messages({
                'date.base': 'Date must be a valid date.',
                'any.required': 'Date is required.',
            }),
            type: Joi.string().min(1).required().messages({
                'string.min': 'Type must have at least 1 character.',
                'any.required': 'Type is required.',
            }),
            comments: Joi.string().optional().messages({
                'string.base': 'Comments must be a string.',
            }),
            favorite: Joi.string().optional().messages({
                'string.base': 'Favorite must be a string.',            
            }),
        }),
    },

    deleteEnterprise: {
        params: {
            id: Joi.number().integer().min(1).required().messages({
                'number.base': 'ID must be an integer.',
                'number.min': 'ID must be at least 1.',
                'any.required': 'ID is required.',
              }),
        },
    },
}