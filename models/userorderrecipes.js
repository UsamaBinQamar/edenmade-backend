import { Sequelize, DataTypes } from 'sequelize';
import User from './User.js';
import Recipes from './Recipes.js';
import Category from './Categories.js';
import OrderDetails from './orderdetails.js';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'edenmade',
});

const UserOrderRecipes = sequelize.define('UserOrderRecipes', {
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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderDetailId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Add other fields as needed
  // For example:
  // someOtherField: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
});

// Define associations between UserOrderRecipes, User, Recipes, Category, and OrderDetailsUserOrderRecipes.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserOrderRecipes.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserOrderRecipes.belongsTo(Recipes, { foreignKey: 'recipeId', as: 'recipe' });
UserOrderRecipes.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
UserOrderRecipes.belongsTo(OrderDetails, { foreignKey: 'orderDetailId', as: 'orderDetail' });


export default UserOrderRecipes;
