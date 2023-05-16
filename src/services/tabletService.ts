import Tablet from '../models/Tablet';

const getOne = async (id: string) => {
  const phone = await Tablet.findByPk(id);

  return phone;
};

const getMinMax = async () => {
  const [cheap] = await Tablet.findAll({
    order: [['priceDiscount', 'ASC']],
    limit: 1,
  });
  const [expensive] = await Tablet.findAll({
    order: [['priceDiscount', 'DESC']],
    limit: 1,
  });

  return [cheap.priceDiscount, expensive.priceDiscount];
};

export default { getOne, getMinMax };
