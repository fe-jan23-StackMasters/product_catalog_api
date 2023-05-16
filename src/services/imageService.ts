import fs from 'fs';

const getBanners = async () => {
  const directoryPath = 'public/img/banners';

  const paths = fs
    .readdirSync(directoryPath)
    .map((path) => `img/banners/${path}`);

  return paths;
};

export default { getBanners };
