import Joi from 'joi';
import { GET_COLLECTION, GET_COLLECTION_BY_ID } from '~/config/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validatorObjectId';

const COLLECTION_NAME = 'products';
const COLLECTION_SCHEMA = Joi.object({
  // productId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required().trim().strict(),
  name: Joi.string().required().min(3).max(255).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().optional().trim().strict(), 
  price: Joi.number().required().min(0).strict(),
  quantity: Joi.number().required().min(0).strict(),
  
  images: Joi.array().items(Joi.object({
    imageUrl: Joi.string().uri().required(),
    altText: Joi.string().optional().trim().strict(),
  })).required().strict().default([]),

  // categoryId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required().trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
})

const validateProductData = async (productData) => {
  try {
    return await COLLECTION_SCHEMA.validateAsync(productData, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    throw new Error(error);
  }
}

const createProduct = async (productData) => {
  try {
    const validatedProductData = await validateProductData(productData);
    const newProduct = await GET_COLLECTION(COLLECTION_NAME).insertOne(validatedProductData);
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
}

const findProductById = async (productId) => {
  try {
    const product = await GET_COLLECTION_BY_ID(COLLECTION_NAME, productId);
    return product;
  } catch (error) {
    throw new Error(error);
  }
}

export const productModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  createProduct,
  findProductById,
}