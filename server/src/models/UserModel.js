const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserModel = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_login: { type: DataTypes.STRING, unique: true, allowNull: false },
  user_password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = UserModel;
