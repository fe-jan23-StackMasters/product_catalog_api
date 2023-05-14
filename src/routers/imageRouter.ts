import express from 'express';
import imageController from '../controllers/imageController';

const imageRouter = express.Router();

imageRouter.get('/banners', imageController.getBanners);

export default imageRouter;
