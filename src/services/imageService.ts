import fs from 'fs';

const getBanners = async () => {
  const mobilePath = 'public/img/banners/phone';
  const desktopPath = 'public/img/banners/desktop';
  const defaultPath = 'img/banners';

  const mobileNames = fs.readdirSync(mobilePath);

  const desktopNames = fs.readdirSync(desktopPath);

  const result = [];

  for (const name of mobileNames) {
    if (desktopNames.includes(name)) {
      result.push({
        mobile: `${defaultPath}/phone/${name}`,
        desktop: `${defaultPath}/desktop/${name}`,
      });
    }
  }

  return result;
};

export default { getBanners };
