// UsersCategories.js

import { Sequelize, DataTypes } from "sequelize";
import User from "./User.js";
import Category from "./Categories.js";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost" , // Replace with your actual database host
    username: "root",
    password: "root",
    database: "edenmade",
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
