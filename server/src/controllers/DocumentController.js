const DocumentService = require("../services/DocumentService");
const { DocumentNameExistsError } = require("../errors");
const { getUserIdFromToken } = require("../utils/auth");
const { UserInvalidTokenError, UserTokenNotFoundError } = require("../errors");

class DocumentController {
  // Создать новый документ: нужно имя документа и содержимое документа
  static async create(req, res) {
    try {
      const { document_name, document_content } = req.body;
      const user_id = getUserIdFromToken(req.cookies.token);
      await DocumentService.create({
        document_name,
        document_content,
        user_id,
      });
      res.status(201).json({
        message: "Документ создан",
      });
    } catch (error) {
      if (error instanceof DocumentNameExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Получить данные документа: нужен ID документа или имя документа
  static async get(req, res) {
    try {
      const { document_id, document_name } = req.query;
      const data = await DocumentService.get({
        document_id,
        document_name,
      });
      res.status(200).json({
        message: "Документ передан",
        data,
      });
    } catch (error) {
      // Специфических ошибок не должно быть
    }
  }

  // Изменить данные документа: нужен ID документа и одно или более его полей для изменения
  static async update(req, res) {
    try {
      const { document_name, document_content } = req.body;
      const { document_id } = req.query;
      const user_id = getUserIdFromToken(req.cookies.token);
      await DocumentService.update({
        document_name,
        document_content,
        document_id,
        user_id,
      });
      res.status(200).json({
        message: "Документ обновлён",
      });
    } catch (error) {
      if (error instanceof DocumentNameExistsError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }

  // Удалить документ: нужен ID документа или имя документа
  static async delete(req, res) {
    try {
      const { document_id } = req.query;
      await DocumentService.delete({ document_id });
      res.status(200).json({
        message: "Документ удалён",
      });
    } catch (error) {
      // Специфических ошибок не должно быть
    }
  }

  // Получить список документов пользователя: нужно указать страницу и её вместимость
  static async list(req, res) {
    try {
      const user_id = getUserIdFromToken(req.cookies.token);
      let { page, limit } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return res.status(400).json({
          message: "Недопустимые параметры пагинации",
          data: null,
        });
      }
      const offset = (page - 1) * limit;
      const data = await DocumentService.list({
        user_id,
        limit,
        offset,
      });
      res.status(200).json({
        message: "Список документов передан",
        data,
      });
    } catch (error) {
      if (error instanceof UserInvalidTokenError)
        res.status(error.code).json({ message: error.message });
      if (error instanceof UserTokenNotFoundError)
        res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = DocumentController;
