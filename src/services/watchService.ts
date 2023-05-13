import Watch from '../models/Watch';

const getOne = async (id: string) => {
  const phone = await Watch.findByPk(id);

  return phone;
};

export default { getOne };
