const UserService = require("../services/UserService");
const DocumentService = require("../services/DocumentService");
const StyleService = require("../services/StyleService");
const { getUserIdFromToken } = require("../utils/auth");
const { UserInvalidTokenError, UserTokenNotFoundError } = require("../errors");

// Проверка на наличие в БД искомой сущности
const PresenceCheck = () => async (req, res, next) => {
  try {
    const { document_id, style_id, document_name, style_name } = req.query;
    const user_id = getUserIdFromToken(req.cookies.token);
    const notFoundResponse = (message) => res.status(404).json({ message });
    if (!(await UserService.userExists({ user_id })))
      return notFoundResponse("Пользователь с данным ID не найден");
    if (document_id && !(await DocumentService.documentExists({ document_id })))
      return notFoundResponse("Документ с данным ID не найден");
    if (style_id && !(await StyleService.styleExists({ style_id })))
      return notFoundResponse("Стиль с данным ID не найден");
    if (
      document_name &&
      !(await DocumentService.documentExists({ document_name }))
    )
      return notFoundResponse("Документ с данным именем не найден");
    if (style_name && !(await StyleService.styleExists({ style_name })))
      return notFoundResponse("Стиль с данным именем не найден");
    next();
  } catch (error) {
    if (error instanceof UserInvalidTokenError)
      res.status(error.code).json({ message: error.message });
    if (error instanceof UserTokenNotFoundError)
      res.status(error.code).json({ message: error.message });
  }
};

module.exports = PresenceCheck;
