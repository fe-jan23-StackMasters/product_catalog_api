/* eslint-disable no-shadow */
import { Request, Response } from 'express';
import productService from '../services/productService';

const getAll = async (req: Request, res: Response) => {
  const products = await productService.getAll();

  res.send(productService.normalize(products));
};

const getOnPage = async (req: Request, res: Response) => {
  const { page = 1 } = req.params;
  const { perPage = 16 } = req.query;

  const products = await productService.getWithParams(+page, +perPage);

  res.send(productService.normalize(products));
};

export default { getAll, getOnPage };
