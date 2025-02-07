const { body, validationResult } = require("express-validator");

const MIN_NAME_LENGTH = 4;

// Валидация имени (документа или стиля)
module.exports = function (fieldName) {
  return async (req, res, next) => {
    body(fieldName)
      .trim()
      .notEmpty()
      .withMessage("Имя обязательно")
      .isLength({ min: MIN_NAME_LENGTH })
      .withMessage(`Минимальная длина имени — ${MIN_NAME_LENGTH} символа`)
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        message: `Валидация имени провалена:\n- ${errors
          .array()
          .map((error) => error.msg)
          .join("\n- ")}`,
      });
    next();
  };
};
