const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const StyleModel = sequelize.define("style", {
  style_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  style_name: { type: DataTypes.STRING, allowNull: false },
  style_description: { type: DataTypes.STRING, allowNull: true },
  style_content: { type: DataTypes.JSONB, allowNull: false },
  style_is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  style_popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = StyleModel;
