const StyleModel = require("../models/StyleModel");
const {
  StyleNameExistsError,
  PrivateStyleAccessError,
  PublicStyleUpdateError,
} = require("../errors");
const { Op } = require("sequelize");

class StyleService {
  /* 
    Public: for controllers
  */

  // Создать стиль
  static async create({
    style_name,
    style_description,
    style_content,
    user_id,
  }) {
    if (await this.#styleNameExists({ style_name, user_id }))
      throw new StyleNameExistsError();
    await StyleModel.create({
      style_name,
      style_description: style_description || "",
      style_content,
      user_id,
    });
  }

  // Получить стиль
  static async get({ style_id, style_name }) {
    const condition = style_id ? { style_id } : { style_name };
    const style = await StyleModel.findOne({
      where: condition,
      attributes: { exclude: ["user_id"] },
    });
    return style;
  }

  // Изменить стиль
  static async update({
    style_name,
    style_description,
    style_content,
    style_id,
    user_id,
    style_is_public,
  }) {
    let style = await StyleModel.findOne({ where: { style_id } });
    if (style_name && style_name !== style.style_name)
      if (await this.#styleNameExists({ style_name, user_id }))
        throw new StyleNameExistsError();
    if (style.style_is_public) throw new PublicStyleUpdateError();
    if (style_name) style.style_name = style_name;
    if (style_description) style.style_description = style_description;
    if (style_content) style.style_content = style_content;
    if (style_is_public !== undefined)
      style = this.#toggleStyleVisibility({ style_is_public, style });
    await style.save();
  }

  // Удалить стиль
  static async delete({ style_id }) {
    const style = await StyleModel.findOne({ where: { style_id } });
    await style.destroy();
  }

  // Получить все стили указанного пользователя
  static async list({ offset, limit, user_id }) {
    const styles = await StyleModel.findAll({
      where: { user_id },
      offset: offset,
      limit: limit,
      order: [["style_name", "ASC"]],
      attributes: { exclude: ["user_id"] },
    });
    const totalStyles = await StyleModel.count({ where: { user_id } });
    return {
      styles,
      total: totalStyles,
    };
  }

  // Получить все публичные стили, чьё название хотя бы частично совпадает с указанным
  static async search({ style_name, offset, limit }) {
    const condition = {
      style_is_public: true,
      style_name: {
        [Op.iLike]: `%${style_name}%`,
      },
    };
    const styles = await StyleModel.findAll({
      where: condition,
      offset: offset,
      limit: limit,
      order: [["style_name", "ASC"]],
      attributes: { exclude: ["user_id"] },
    });
    const totalStyles = await StyleModel.count({
      where: condition,
    });
    return {
      styles,
      total: totalStyles,
    };
  }

  // Скопировать публичный стиль себе на аккаунт
  static async copy({ style_id, user_id }) {
    let style = await StyleModel.findOne({
      where: { style_id },
    });
    if (!style.style_is_public) throw new PrivateStyleAccessError();
    if (await this.#styleNameExists({ style_name: style.style_name, user_id }))
      throw new StyleNameExistsError();
    await StyleModel.create({
      style_name: style.style_name,
      style_description: style.style_description,
      style_content: style.style_content,
      user_id,
    });
  }

  /* 
    Protected: for middleware
  */

  // Проверить существование стиля
  static async styleExists({ style_id, style_name }) {
    const condition = style_id ? { style_id } : { style_name };
    const style = await StyleModel.findOne({ where: condition });
    return Boolean(style);
  }

  /* 
    Private: for internal use
  */

  // Проверка на наличие у пользователя стиля с таким же именем
  static async #styleNameExists({ style_name, user_id }) {
    const existingStyle = await StyleModel.findOne({
      where: { style_name, user_id },
    });
    return existingStyle !== null;
  }

  // Изменить видимость стиля
  static #toggleStyleVisibility({ style_is_public, style }) {
    if (style_is_public === false) style.style_popularity = 0;
    style.style_is_public = style_is_public;
    return style;
  }
}

module.exports = StyleService;
