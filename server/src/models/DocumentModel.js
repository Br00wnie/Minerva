const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const DocumentModel = sequelize.define("document", {
  document_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  document_name: { type: DataTypes.STRING, allowNull: false },
  document_content: { type: DataTypes.JSONB, allowNull: false },
});

module.exports = DocumentModel;
