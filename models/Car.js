import sequelize from "../databases/sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Car = sequelize.define("Car", {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  kms: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  energie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default Car;
