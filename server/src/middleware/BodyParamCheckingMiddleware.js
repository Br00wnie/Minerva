// Проверка наличия указанных параметров в body
module.exports = (requiredParams) => (req, res, next) => {
  const missingParams = requiredParams.filter((param) => !(param in req.body));
  if (missingParams.length)
    return res.status(400).json({
      message: `Не указаны обязательные параметры: ${missingParams.join(", ")}`,
    });
  next();
};
