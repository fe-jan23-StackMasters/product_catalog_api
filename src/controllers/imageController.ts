import { Request, Response } from 'express';
import imageService from '../services/imageService';

const getBanners = async (req: Request, res: Response) => {
  const banners = await imageService.getBanners();

  res.send(banners);
};

export default {
  getBanners,
};
