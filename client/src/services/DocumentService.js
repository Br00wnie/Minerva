import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import { nameYup } from "../utils/validation";
import defaultDocument from "../json/defaultDocument.json";
import stores from "../stores/index.js";

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
    stores.DocumentStore.set({
      documentName,
      documentContent: defaultDocument.content,
      documentId: null,
    });
    toast(`Создан документ ${documentName}`);
    stores.ModalStore.closeModal();
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
      stores.DocumentStore.set({
        documentName: document.name,
        documentContent: document.content,
        documentId: null,
      });
    }
    toast(message);
  }

  static async export() {
    const { id, ...document } = stores.DocumentStore.get();
    const { message } = exportFile(document);
    toast(message);
  }

  /* 
    External
  */
}

export default DocumentService;
