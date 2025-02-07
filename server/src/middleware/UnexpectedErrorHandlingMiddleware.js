// Обработка неожиданных ошибок
module.exports = function (err, req, res, next) {
  console.error(err);
  return res.status(500).json({ message: "Неожиданная ошибка" });
};
