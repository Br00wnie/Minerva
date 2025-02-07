const { body, validationResult } = require("express-validator");

const MIN_LOGIN_LENGTH = 4;

// Валидация логина
const LoginValidation = () => [
  body("user_login")
    .trim()
    .notEmpty()
    .withMessage("Логин обязателен")
    .isLength({ min: MIN_LOGIN_LENGTH })
    .withMessage(`Минимальная длина логина — ${MIN_LOGIN_LENGTH} символа`),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        message: `Валидация логина провалена:\n- ${errors
          .array()
          .map((error) => error.msg)
          .join("\n- ")}`,
      });
    next();
  },
];

module.exports = LoginValidation;
