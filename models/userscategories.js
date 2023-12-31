// UsersCategories.js

import { Sequelize, DataTypes } from "sequelize";
import User from "./User.js";
import Category from "./Categories.js";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

const UsersCategories = sequelize.define("UsersCategories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

// Define the many-to-many relationship
User.belongsToMany(Category, { through: UsersCategories, foreignKey: "userId" });
Category.belongsToMany(User, { through: UsersCategories, foreignKey: "categoryId" });

export default UsersCategories;
