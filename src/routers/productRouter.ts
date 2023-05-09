/* eslint-disable no-shadow */
import express, { NextFunction, Request, Response } from 'express';
import productController from '../controllers/productController';

const productRouter = express.Router();

const hasParams = (req: Request, _res: Response, next: NextFunction) => {
  if (Object.keys(req.query).length > 0) {
    next('route');
  } else {
    next();
  }
};

productRouter.get('/products', hasParams, productController.getAll);
productRouter.get('/products', productController.getOnPage);
productRouter.get('/products/:page', productController.getOnPage);
// productRouter.get('/products/new', () => {});
// productRouter.get('/products/discount', () => {});

export default productRouter;
