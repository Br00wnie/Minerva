// Проверка наличия указанных параметров в query
module.exports = (requiredParams) => (req, res, next) => {
  const missingParams = requiredParams.filter((param) => !(param in req.query));
  if (missingParams.length)
    return res.status(400).json({
      message: `Не указаны обязательные параметры: ${missingParams.join(", ")}`,
    });
  next();
};
