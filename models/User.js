// User.js

import { Sequelize, DataTypes } from "sequelize";
import Category from "./Categories.js"; // Assuming the Category model is in the same directory
import Recipe from "./Recipes.js"; // Assuming the Recipe model is in the same directory

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isFirstTimeLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Default value is true
    },
});

// Define associations between User, Category, and Recipe
User.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
User.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

export default User;
