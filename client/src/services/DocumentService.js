import toast from "../components/ui/toast/MyToast.jsx";
import { logAction } from "../utils/logging.js";
import { exportFile } from "../utils/fileExport.js";
import { importFile } from "../utils/fileImport.js";
import { nameYup } from "../utils/validation";
import DocumentApi from "../http/DocumentApi.js";
import initialDocument from "../components/editor/initialDocument.js";
import { write, read } from "../utils/storageManagement.js";

class DocumentService {
  static async export() {
    const { exportedFile, message } = exportFile("document");
    toast(message);
    logAction("Попытка экспорта документа", {
      exportedFile,
      message,
    });
  }

  static async import({}, { DocumentStore }) {
    const { message, importedFile } = await importFile();
    toast(message);
    logAction("Попытка импорта файла", {
      message,
      importedFile,
    });
    DocumentStore.setDocument(importedFile);
    write("documentId", null);
  }

  static async create({ documentName }, { DocumentStore, ModalStore }) {
    let res;
    try {
      await nameYup.validate({
        name: documentName,
      });
    } catch (error) {
      res = { status: 400, message: error.message };
    }
    if (!res) {
      res = await DocumentApi.create(documentName);
      if (res.status === 201) {
        ModalStore.openModal(null);
        const document = await DocumentService.get({ documentName }, {});
        DocumentStore.setDocument({
          name: document.data.document_name,
          content: document.data.document_content,
        });
        write("documentId", document.data.document_id);
      }
    }
    logAction("Попытка создания документа", { documentName }, res);
    toast(res.message);
  }

  static async get({ documentName, documentId }, {}) {
    if (documentName)
      return await DocumentApi.get({ document_name: documentName });
    else return await DocumentApi.get({ document_id: documentId });
  }

  static async clear({}, { DocumentStore }) {
    console.log(initialDocument.name);
    console.log(initialDocument.content);
    DocumentStore.setDocument({
      name: initialDocument.name,
      content: initialDocument.content,
    });
    write("documentId", null);
  }

  static async delete({ documentId }, { DocumentStore, ModalStore }) {
    const res = await DocumentApi.delete(documentId);
    if (res.status === 204) {
      ModalStore.openModal(null);
      this.clear({}, { DocumentStore });
    }
    toast(res.message);
    logAction("Попытка удаления документа", {}, res);
  }

  static async save({ documentId }, { DocumentStore }) {
    const res = await DocumentApi.update(
      documentId,
      JSON.parse(read("document"))
    );
    toast(res.message);
    logAction("Попытка сохранения документа", {}, res);
  }

  static async getDocuments(page, itemsPerPage) {
    try {
      const res = await DocumentApi.getDocuments(page, itemsPerPage);
      if (res.status === 200) {
        return {
          data: res.data,
          totalPages: res.totalPages,
        };
      } else {
        throw new Error("Ошибка при получении документов");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при загрузке документов");
    }
  }
}

export default DocumentService;
