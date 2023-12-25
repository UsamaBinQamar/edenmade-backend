// Category.js

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "127.0.0.1", // Replace with your actual database host
    username: "root",
    password: "ProfitPoint/99",
    database: "edenmade",
});

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
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

export default Category;
