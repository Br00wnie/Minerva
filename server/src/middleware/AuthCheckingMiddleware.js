const { getUserIdFromToken } = require("../utils/auth");
const { UserInvalidTokenError, UserTokenNotFoundError } = require("../errors");

// Проверка на наличие валидного токена в cookies
const AuthCheck = () => (req, res, next) => {
  try {
    getUserIdFromToken(req.cookies.token);
    next();
  } catch (error) {
    if (error instanceof UserInvalidTokenError)
      res.status(error.code).json({ message: error.message });
    if (error instanceof UserTokenNotFoundError)
      res.status(error.code).json({ message: error.message });
  }
};

module.exports = AuthCheck;
