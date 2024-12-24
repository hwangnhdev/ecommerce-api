import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { productsRoute } from './productRoute';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API is running' });
});

router.use('/products', productsRoute);

export const APIs_v1 = router;
