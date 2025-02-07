class UserError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// Пользователь с заданным логином уже существует
class UserLoginExistsError extends UserError {
  constructor() {
    super("Пользователь с заданным логином уже существует", 409);
  }
}

// Пользователь с заданным логином не найден
class UserLoginNotFoundError extends UserError {
  constructor() {
    super("Пользователь с заданным логином не найден", 404);
  }
}

// Неверно указан пароль
class UserWrongPasswordError extends UserError {
  constructor() {
    super("Неверно указан пароль", 401);
  }
}

// Токен невалиден
class UserInvalidTokenError extends UserError {
  constructor() {
    super("Невалидный JWT", 403);
  }
}

// Токен не найден
class UserTokenNotFoundError extends UserError {
  constructor() {
    super("Не авторизован", 401);
  }
}

module.exports = {
  UserLoginExistsError,
  UserLoginNotFoundError,
  UserWrongPasswordError,
  UserTokenNotFoundError,
  UserInvalidTokenError,
};
