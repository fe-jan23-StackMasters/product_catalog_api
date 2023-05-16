import Watch from '../models/Watch';

const getOne = async (id: string) => {
  const phone = await Watch.findByPk(id);

  return phone;
};

const getMinMax = async () => {
  const [cheap] = await Watch.findAll({
    order: [['priceDiscount', 'ASC']],
    limit: 1,
  });
  const [expensive] = await Watch.findAll({
    order: [['priceDiscount', 'DESC']],
    limit: 1,
  });

  return [cheap.priceDiscount, expensive.priceDiscount];
};

export default { getOne, getMinMax };
