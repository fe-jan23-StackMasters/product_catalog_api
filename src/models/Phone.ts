import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'phones',
})

export class Phone extends Model {
  @Column({
    type: DataTypes.STRING,
  })
    id: string;

  @Column({
    type: DataTypes.STRING,
  })
    namespaceId: string;

  @Column({
    type: DataTypes.STRING,
  })
    name: string;

  @Column({
    type: DataTypes.STRING,
  })
    capacityAvailable: string[];

  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;

  @Column({
    type: DataTypes.NUMBER,
  })
    priceRegular: number;

  @Column({
    type: DataTypes.NUMBER,
  })
    priceDiscount: number;

  @Column({
    type: DataTypes.STRING,
  })
    colorsAvailable: string[];

  @Column({
    type: DataTypes.STRING,
  })
    color: string;

  @Column({
    type: DataTypes.STRING,
  })
    images: string[];

  @Column({
    type: DataTypes.STRING,
  })
    description: {
    title: string;
    text: string[];
  }[];

  @Column({
    type: DataTypes.STRING,
  })
    screen: string;

  @Column({
    type: DataTypes.STRING,
  })
    resolution: string;

  @Column({
    type: DataTypes.STRING,
  })
    processor: string;

  @Column({
    type: DataTypes.STRING,
  })
    ram: string;

  @Column({
    type: DataTypes.STRING,
  })
    camera: string;

  @Column({
    type: DataTypes.STRING,
  })
    zoom: string;

  @Column({
    type: DataTypes.STRING,
  })
    cell: string[];
}
