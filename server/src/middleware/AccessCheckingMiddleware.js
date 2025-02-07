const UserService = require("../services/UserService");
const { getUserIdFromToken } = require("../utils/auth");
const { UserInvalidTokenError, UserTokenNotFoundError } = require("../errors");

// Проверка на наличие доступа у пользователя к запрашиваемой сущности (документ или стиль)
const AccessCheck = () => async (req, res, next) => {
  try {
    const { document_id, style_id, document_name, style_name } = req.query;
    const user_id = getUserIdFromToken(req.cookies.token);
    const noAccessResponse = (message) => res.status(403).json({ message });
    if (
      document_id &&
      !(await UserService.userHasDocument({ user_id, document_id }))
    )
      return noAccessResponse("У вас нет доступа к данному документу");
    if (style_id && !(await UserService.userHasStyle({ user_id, style_id })))
      return noAccessResponse("У вас нет доступа к данному стилю");
    if (
      document_name &&
      !(await UserService.userHasDocument({ user_id, document_name }))
    )
      return noAccessResponse("У вас нет доступа к данному документу");
    if (
      style_name &&
      !(await UserService.userHasStyle({ user_id, style_name }))
    )
      return noAccessResponse("У вас нет доступа к данному стилю");
    next();
  } catch (error) {
    if (error instanceof UserInvalidTokenError)
      res.status(error.code).json({ message: error.message });
    if (error instanceof UserTokenNotFoundError)
      res.status(error.code).json({ message: error.message });
  }
};

module.exports = AccessCheck;
