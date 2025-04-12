import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import { nameYup } from "../utils/validation";
import defaultDocument from "../json/defaultDocument.json";
import DocumentStore from "../stores/DocumentStore.js";
import ModalStore from "../stores/ModalStore.js";

class DocumentService {
  /* 
    Internal
  */

  static async create({ documentName }) {
    try {
      await nameYup.validate({
        name: documentName,
      });
    } catch (error) {
      toast(error.message);
      return;
    }
    DocumentStore.set({
      documentName,
      documentContent: defaultDocument.content,
      documentId: null,
    });
    toast(`Создан документ ${documentName}`);
    ModalStore.closeModal();
  }

  static async import() {
    const { success, message, file: document } = await importFile();
    if (success) {
      if (!document.name) {
        toast("Не найдено имя документа");
        return;
      }
      if (!document.content) {
        toast("Не найдено содержимое документа");
        return;
      }
      DocumentStore.set({
        documentName: document.name,
        documentContent: document.content,
        documentId: null,
      });
    }
    toast(message);
  }

  static async export() {
    const { id, ...document } = DocumentStore.get();
    const { message } = exportFile(document);
    toast(message);
  }

  /* 
    External
  */
}

export default DocumentService;
