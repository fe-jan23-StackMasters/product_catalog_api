import express from 'express';
import productController from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', productController.getOnPage);
productRouter.get('/new', productController.getNew);
productRouter.get('/discount', productController.getHot);
productRouter.get('/minmax', productController.getMinMax);
productRouter.get('/:productId', productController.getOne);
productRouter.get('/:productId/recommended', productController.getRecommended);

export default productRouter;
