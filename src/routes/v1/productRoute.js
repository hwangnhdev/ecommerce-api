import { StatusCodes } from 'http-status-codes';
import { productValidation } from '~/validations/productValidation.js';
import { productController } from '~/controllers/productController.js';
// import { Product } from '~/models/productModel.js';

const express = require('express');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(StatusCodes.OK).json({ message: 'Products fetched successfully' });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  })
  .post(productValidation.createProduct, productController.createProduct)
  // .put(async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name, description, price, stock, category_id, image_url } = req.body;
  //     const updatedProduct = await Product.findByIdAndUpdate(
  //       id,
  //       { name, description, price, stock, category_id, image_url },
  //       { new: true }
  //     );
  //     if (!updatedProduct) {
  //       return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
  //     }
  //     res.json(updatedProduct);
  //   } catch (err) {
  //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  //   }
  // })
  // .delete(async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const deletedProduct = await Product.findByIdAndDelete(id);
  //     if (!deletedProduct) {
  //       return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
  //     }
  //     res.json({ message: 'Product deleted successfully' });
  //   } catch (err) {
  //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  //   }
  // });

export const productsRoute = router;
