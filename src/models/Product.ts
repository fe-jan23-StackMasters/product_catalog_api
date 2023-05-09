import {
  Table,
  Model,
  Column,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Phone from './Phone';

@Table({
  tableName: 'products',
})

class Product extends Model {
  @Column({
    type: DataTypes.STRING,
    primaryKey: true,
  })
    id: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    category: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;
  @ForeignKey(() => Phone)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    itemId: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    name: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    fullPrice: number;
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    price: number;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    screen: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    color: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    ram: string;
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    year: number;
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    image: string;
}

export default Product;
