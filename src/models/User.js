const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
  {
    email : {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
  }
);


module.exports = User;
