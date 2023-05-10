import Phone from '../models/Phone';

const getOne = async (id: string) => {
  const phone = await Phone.findByPk(id);

  return phone;
};

export default { getOne };
