import sequelize from "../databases/sequelize.js";
import { DataTypes } from "sequelize";
import Car from "./Car.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
User.hasMany(Car, { foreignKey: "owner_id", as: "cars" });
Car.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
export default User;
