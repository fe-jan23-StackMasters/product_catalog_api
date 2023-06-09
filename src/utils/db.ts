import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config.js';
import Product from '../models/Product';
import Phone from '../models/Phone';
import Watch from '../models/Watch';
import Tablet from '../models/Tablet';

const { DB_URL = '' } = process.env;

export const initDb = async () => {
  const sequelize = new Sequelize(DB_URL, {
    models: [Product, Phone, Watch, Tablet],
    dialectOptions: {
      ssl: true,
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};
