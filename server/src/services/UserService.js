const DocumentModel = require("../models/DocumentModel");
const StyleModel = require("../models/StyleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const {
  UserLoginExistsError,
  UserLoginNotFoundError,
  UserWrongPasswordError,
} = require("../errors");

const HASH_ROUND_COUNT = 8;

class UserService {
  /* 
    Public: for controllers
  */

  // Создать пользователя
  static async create({ user_login, user_password }) {
    if (await this.#userLoginExists({ user_login }))
      throw new UserLoginExistsError();
    const hashedPassword = await bcrypt.hash(user_password, HASH_ROUND_COUNT);
    await UserModel.create({
      user_login,
      user_password: hashedPassword,
    });
  }

  // Получить пользователя
  static async get({ user_id }) {
    const user = await UserModel.findOne({
      where: { user_id },
      attributes: { exclude: ["user_id", "user_password"] },
    });
    return user;
  }

  // Изменить пользователя
  static async update({ user_id, user_login, user_password }) {
    const user = await UserModel.findOne({ where: { user_id } });
    if (user_login && user_login !== user.user_login)
      if (await this.#userLoginExists({ user_login }))
        throw new UserLoginExistsError();
    if (user_login) user.user_login = user_login;
    if (user_password) {
      const hashedPassword = await bcrypt.hash(user_password, HASH_ROUND_COUNT);
      user.user_password = hashedPassword;
    }
    await user.save();
  }

  // Удалить пользователя
  static async delete({ user_id }) {
    const user = await UserModel.findOne({ where: { user_id } });
    await user.destroy();
  }

  // Авторизовать пользователя — сгенерировать для него токен
  static async login({ user_login, user_password }) {
    const user = await UserModel.findOne({ where: { user_login } });
    if (!user) throw new UserLoginNotFoundError();
    const passwordMatch = bcrypt.compareSync(user_password, user.user_password);
    if (!passwordMatch) throw new UserWrongPasswordError();
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.SECRET || "pony",
      {
        expiresIn: "24h",
      }
    ); // Для прода нужно будет задать более серьёзные настройки
    return token;
  }

  /* 
    Protected: for middleware
  */

  // Проверить существование пользователя
  static async userExists({ user_id }) {
    if (await UserModel.findOne({ where: { user_id } })) return true;
    else return false;
  }

  // Проверить наличие указанного документа у пользователя
  static async userHasDocument({ user_id, document_id, document_name }) {
    const condition = document_id
      ? { user_id, document_id }
      : { user_id, document_name };
    const document = await DocumentModel.findOne({ where: condition });
    return Boolean(document);
  }

  // Проверить наличие указанного стиля у пользователя
  static async userHasStyle({ user_id, style_id, style_name }) {
    const condition = style_id
      ? { user_id, style_id }
      : { user_id, style_name };
    const style = await StyleModel.findOne({ where: condition });
    return Boolean(style);
  }

  /* 
    Private: for internal use
  */

  // Проверка на существование пользователя с указанным логином
  static async #userLoginExists({ user_login }) {
    const existingUser = await UserModel.findOne({
      where: { user_login },
    });
    return existingUser !== null;
  }
}

module.exports = UserService;
