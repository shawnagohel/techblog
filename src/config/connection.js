if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL);

module.exports = sequelize;