import { Sequelize, DataTypes } from 'sequelize';

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
  numberOfPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipesPerWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default OrderDetails;
