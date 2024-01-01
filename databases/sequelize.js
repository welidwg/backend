import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
    database: "cars",
    username: "phpmyadmin",
    password: "root",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306"
});

export default sequelize;