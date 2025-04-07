const StyleService = require("../services/StyleService");
const { StyleNameExistsError } = require("../errors");
const { getUserIdFromToken } = require("../utils/auth");
const {
  UserInvalidTokenError,
  UserTokenNotFoundError,
  InvalidPaginationParamsError,
  PublicStyleUpdateError,
  PrivateStyleAccessError,
} = require("../errors");

class StyleController {
  /* 
    Public
  */

  // Создать новый стиль: нужны имя стиля и содержимое стиля
  static async create(req, res) {
    try {
      const { style_name, style_description, style_content } = req.body;
      const user_id = getUserIdFromToken(req.cookies.token);
      await StyleService.create({
        style_name,
        style_description,
        style_content,
        user_id,
      });
      res.status(201).json({
        message: "Стиль создан",
      });
    } catch (error) {
      if (error instanceof StyleNameExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Получить данные стиля: нужен ID стиля или имя стиля
  static async get(req, res) {
    try {
      const { style_id, style_name } = req.query;
      const data = await StyleService.get({
        style_id,
        style_name,
      });
      res.status(200).json({
        message: "Стиль передан",
        data,
      });
    } catch (error) {
      // Специфических ошибок не должно быть
    }
  }

  // Изменить данные стиля: нужен ID стиля и одно или более его полей для изменения
  static async update(req, res) {
    try {
      const { style_name, style_description, style_content, style_is_public } =
        req.body;
      const { style_id } = req.query;
      const user_id = getUserIdFromToken(req.cookies.token);
      await StyleService.update({
        style_name,
        style_description,
        style_content,
        style_id,
        user_id,
        style_is_public,
      });
      res.status(200).json({
        message: "Стиль обновлён",
      });
    } catch (error) {
      if (error instanceof StyleNameExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof PublicStyleUpdateError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Удалить стиль: нужно имя стиля или ID стиля
  static async delete(req, res) {
    try {
      const { style_id } = req.query;
      await StyleService.delete({ style_id });
      res.status(200).json({
        message: "Документ удалён",
      });
    } catch (error) {
      // Специфических ошибок не должно быть
    }
  }

  // Получить список стилей пользователя: нужно указать страницу и её вместимость
  static async list(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      const { limit, offset } = this.#handlePagination(req);
      const data = await StyleService.list({
        user_id,
        limit,
        offset,
      });
      res.status(200).json({
        message: "Указанный список стилей пользователя передан",
        data,
      });
    } catch (error) {
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof InvalidPaginationParamsError)
        return res.status(error.code).json({ message: error.message });
    }
  }

  // Получить список публичных стилей: нужно указать название искомого стиля, страницу и её вместимость
  static async search(req, res) {
    try {
      const { style_name } = req.query;
      const { limit, offset } = this.#handlePagination(req);
      const data = await StyleService.search({
        style_name,
        limit,
        offset,
      });
      res.status(200).json({
        message: "Указанный список публичных стилей передан",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidPaginationParamsError)
        return res.status(error.code).json({ message: error.message });
    }
  }

  // Скопировать публичный стиль себе на аккаунт: нужно указать ID стиля
  static async copy(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      const { style_id } = req.query;
      await StyleService.copy({ style_id, user_id });
      res.status(201).json({
        message: "Стиль скопирован на аккаунт",
      });
    } catch (error) {
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof StyleNameExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof PrivateStyleAccessError)
        res.status(error.code).json({ message: error.message });
    }
  }

  /* 
    Private
  */

  // Обработка параметров пагинации
  static #handlePagination(req) {
    let { page, limit } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0)
      throw new InvalidPaginationParamsError();
    const offset = (page - 1) * limit;
    return { limit, offset };
  }
}

module.exports = StyleController;
