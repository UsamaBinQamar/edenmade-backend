// Recipes.js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost", // Replace with your actual database host
    username: "root",
    password: "root",
    database: "edenmade",
});

const Recipe = sequelize.define("Recipe", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
});

export default Recipe;
