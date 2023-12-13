// // User.js

// import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize({
//     dialect: "mysql",
//     host: "your_database_host", // Add your actual database host
//     username: "root",
//     password: "root",
//     database: "edenmade",
// });

// const User = sequelize.define("User", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: true, // Modify based on your requirements
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: true, // Modify based on your requirements
//     },
//     city: {
//         type: DataTypes.STRING,
//         allowNull: true, // Modify based on your requirements
//     },
//     postalCode: {
//         type: DataTypes.STRING,
//         allowNull: true, // Modify based on your requirements
//     },
// });

// export default User;


// User.js

import { Sequelize, DataTypes } from "sequelize";
import Category from "./Category"; // Assuming the Category model is in the same directory
import Recipe from "./Recipe"; // Assuming the Recipe model is in the same directory

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "your_database_host", // Add your actual database host
    username: "root",
    password: "root",
    database: "edenmade",
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
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    numberOfDishesPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Category,
            key: "id",
        },
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Recipe,
            key: "id",
        },
    },
});

// Define associations between User, Category, and Recipe
User.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
User.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

export default User;
