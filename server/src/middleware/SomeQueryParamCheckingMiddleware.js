// Проверка наличия хотя бы одного из указанных параметров в query
module.exports = (params) => (req, res, next) => {
  const hasAtLeastOneParam = params.some((param) => param in req.query);
  if (!hasAtLeastOneParam)
    return res.status(400).json({
      message: `Не указан ни один из следующих параметров: ${params.join(
        ", "
      )}`,
    });
  next();
};
