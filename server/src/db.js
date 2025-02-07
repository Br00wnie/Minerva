const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME || "minerva",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "1234",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    define: {
      timestamps: false, // Запрещаем Sequelize автоматически создавать временные метки в таблицах
    },
    logging: false,
  }
);
