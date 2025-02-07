const DocumentModel = require("../models/DocumentModel");
const { DocumentNameExistsError } = require("../errors");

class DocumentService {
  /* 
    Public: for controllers
  */

  // Создать документ
  static async create({ document_name, document_content, user_id }) {
    if (await this.#documentNameExists({ document_name, user_id }))
      throw new DocumentNameExistsError();
    await DocumentModel.create({ document_name, document_content, user_id });
  }

  // Получить документ
  static async get({ document_id, document_name }) {
    const condition = document_id ? { document_id } : { document_name };
    const document = await DocumentModel.findOne({
      where: condition,
      attributes: { exclude: ["user_id"] },
    });
    return document;
  }

  // Изменить документ
  static async update({
    document_name,
    document_content,
    document_id,
    user_id,
  }) {
    const document = await DocumentModel.findOne({ where: { document_id } });
    if (document_name && document_name !== document.document_name)
      if (await this.#documentNameExists({ document_name, user_id }))
        throw new DocumentNameExistsError();
    if (document_name) document.document_name = document_name;
    if (document_content) document.document_content = document_content;
    await document.save();
  }

  // Удалить документ
  static async delete({ document_id }) {
    const document = await DocumentModel.findOne({ where: { document_id } });
    await document.destroy();
  }

  // Получить все документы указанного пользователя
  static async list({ offset, limit, user_id }) {
    const documents = await DocumentModel.findAll({
      where: { user_id },
      offset: offset,
      limit: limit,
      order: [["document_name", "ASC"]],
      attributes: { exclude: ["user_id"] },
    });
    const totalDocuments = await DocumentModel.count({ where: { user_id } });
    return {
      documents,
      total: totalDocuments,
    };
  }

  /* 
    Protected: for middleware
  */

  // Проверить существование документа
  static async documentExists({ document_id, document_name }) {
    const condition = document_id ? { document_id } : { document_name };
    const document = await DocumentModel.findOne({ where: condition });
    return Boolean(document);
  }

  /* 
    Private: for internal use
  */

  // Проверка на наличие у пользователя документа с таким же именем
  static async #documentNameExists({ document_name, user_id }) {
    const existingDocument = await DocumentModel.findOne({
      where: { document_name, user_id },
    });
    return existingDocument !== null;
  }
}

module.exports = DocumentService;
