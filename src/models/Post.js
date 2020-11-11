const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
  {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement : true
    },
    title : {
      type: DataTypes.STRING,
      allowNull: false
    },
    body : {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    user_id : {
      type: DataTypes.STRING,
      allowNull: false,
      
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);


module.exports = Post;
