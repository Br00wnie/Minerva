const { body, validationResult } = require("express-validator");

const MIN_PASSWORD_LENGTH = 8;

// Валидация пароля
const PasswordValidation = () => [
  body("user_password")
    .trim()
    .notEmpty()
    .withMessage("Пароль обязателен")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`Минимальная длина пароля — ${MIN_PASSWORD_LENGTH} символов`)
    .matches(/\d/)
    .withMessage("Пароль должен содержать хотя бы одну цифру")
    .matches(/[A-Z]/)
    .withMessage("Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Пароль должен содержать хотя бы один спецсимвол"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        message: `Валидация пароля провалена:\n- ${errors
          .array()
          .map((error) => error.msg)
          .join("\n- ")}`,
      });
    next();
  },
];

module.exports = PasswordValidation;
