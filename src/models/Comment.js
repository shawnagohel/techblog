const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
  {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement : true
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id : {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment : {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);


module.exports = Comment;
