import { slugify } from '../utils/slugifyFormatter';
import { productModel } from '../models/productModel';

const createProduct = async (reqBody) => {
  try {
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.name, { lower: true }),
    }
    const createdProduct = await productModel.createProduct(newProduct);
    return createdProduct; //Remember to return the new product
  } catch (error) {
    throw new Error(error.message);
  }
}

export const productService = {
  createProduct,
};