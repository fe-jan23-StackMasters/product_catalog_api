import Phone from '../models/Phone';

const getOne = async (id: string) => {
  const phone = await Phone.findByPk(id);

  return phone;
};

const getMinMax = async () => {
  const [cheap] = await Phone.findAll({
    order: [['priceDiscount', 'ASC']],
    limit: 1,
  });
  const [expensive] = await Phone.findAll({
    order: [['priceDiscount', 'DESC']],
    limit: 1,
  });

  return [cheap.priceDiscount, expensive.priceDiscount];
};

export default { getOne, getMinMax };
