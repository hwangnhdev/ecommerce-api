import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(255).trim().strict().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 255 characters long',
  }),
  description: Joi.string().required().min(3).max(255).trim().strict().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 3 characters long',
    'string.max': 'Description must be at most 255 characters long',
  }),
  price: Joi.number().required().min(0).precision(2).messages({
    'number.base': 'Price must be a number',
    'number.empty': 'Price is required',
    'number.min': 'Price must be at least 0',
    'number.precision': 'Price must have 2 decimal places',
  }),
  quantity: Joi.number().required().min(0).integer().messages({
    'number.base': 'Quantity must be a number',
    'number.empty': 'Quantity is required',
    'number.min': 'Quantity must be at least 0',
    'number.integer': 'Quantity must be an integer',
  }),
  // category_id: Joi.string().required().min(1).max(255).trim().messages({
  //   'string.base': 'Category ID must be a string',
  //   'string.empty': 'Category ID is required',
  //   'string.min': 'Category ID must be at least 1 character long',
  //   'string.max': 'Category ID must be at most 255 characters long',
  // }),
  // image_url: Joi.string().required().min(3).max(1024).uri().trim().messages({
  //   'string.base': 'Image URL must be a string',
  //   'string.empty': 'Image URL is required',
  //   'string.min': 'Image URL must be at least 3 characters long',
  //   'string.max': 'Image URL must be at most 1024 characters long',
  //   'string.uri': 'Image URL must be a valid URL',
  // }),
});

const createProduct = async (req, res, next) => {
  try {
    await productSchema.validateAsync(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    next();
  } catch (err) {
    if (err.isJoi) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Validation Error',
        details: err.details
      });
    }

    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(err).message))
  }
}

export const productValidation = {
  createProduct,
}
