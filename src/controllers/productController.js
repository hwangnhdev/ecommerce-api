import { StatusCodes } from 'http-status-codes';
import { productService } from '../services/productService';

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    
    res.status(StatusCodes.CREATED).json({ createdProduct });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export const productController = {
  createProduct,
};