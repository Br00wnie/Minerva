const jwt = require("jsonwebtoken");
const { UserInvalidTokenError, UserTokenNotFoundError } = require("../errors");

// Получить ID пользователя из токена
function getUserIdFromToken(token) {
  if (!token) throw new UserTokenNotFoundError();
  try {
    const decoded = jwt.verify(token, process.env.SECRET || "pony");
    return decoded.user_id;
  } catch (error) {
    throw new UserInvalidTokenError();
  }
}

module.exports = { getUserIdFromToken };
