const UserService = require("../services/UserService");
const { getUserIdFromToken } = require("../utils/auth");
const {
  UserLoginExistsError,
  UserLoginNotFoundError,
  UserWrongPasswordError,
  UserInvalidTokenError,
  UserTokenNotFoundError,
} = require("../errors");

class UserController {
  // Создать нового пользователя: нужен логин и пароль
  static async create(req, res) {
    try {
      const { user_login, user_password } = req.body;
      await UserService.create({
        user_login,
        user_password,
      });
      res.status(201).json({
        message: "Пользователь создан",
      });
    } catch (error) {
      if (error instanceof UserLoginExistsError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Получить данные пользователя
  static async get(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      const data = await UserService.get({
        user_id,
      });
      res.status(200).json({
        message: "Пользователь передан",
        data,
      });
    } catch (error) {
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Изменить данные пользователя: нужен токен и одно или более полей для изменения
  static async update(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      const { user_login, user_password } = req.body;
      await UserService.update({
        user_login,
        user_password,
        user_id,
      });
      res.status(200).json({
        message: "Пользователь обновлён",
      });
    } catch (error) {
      if (error instanceof UserLoginExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Удалить пользователя: нужен токен
  static async delete(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      await UserService.delete({ user_id });
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Войти в аккаунт: нужен логин и пароль
  static async login(req, res) {
    try {
      const { user_login, user_password } = req.body;
      const data = await UserService.login({ user_login, user_password });
      res.cookie("token", data, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Токен передан",
      });
    } catch (error) {
      if (error instanceof UserLoginNotFoundError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserWrongPasswordError)
        res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = UserController;
