import { Sequelize, DataTypes } from 'sequelize';
import Category from './Categories.js';
import Recipe from './Recipes.js';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Replace with your actual database host
  username: 'root',
  password: 'root',
  database: 'edenmade',
});

const OrderDetails = sequelize.define('OrderDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
   deliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed
});

// Define associations between OrderDetails, Category, and Recipe
OrderDetails.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
OrderDetails.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

export default OrderDetails;
