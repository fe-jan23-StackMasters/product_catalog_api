import Tablet from '../models/Tablet';

const getOne = async (id: string) => {
  const phone = await Tablet.findByPk(id);

  return phone;
};

export default { getOne };
