import { getModalServices } from "../stores/ModalStore.js";
import {
  getDocumentStore,
  getDocumentServices,
} from "../stores/DocumentStore.js";
import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import { nameYup } from "../utils/validation";
import defaultDocument from "../json/defaultDocument.json";

class DocumentService {
  /* 
    External
  */

  static create({ documentName }) {
    try {
      nameYup.validate({
        name: documentName,
      });
    } catch (error) {
      toast(error.message);
      return;
    }
    const documentService = getDocumentServices();
    documentService.setName(documentName);
    documentService.setContent(defaultDocument.content);
    documentService.setId(null);
    toast(`Создан документ ${documentName}`);
    getModalServices().closeModal();
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
      const documentService = getDocumentServices();
      documentService.setName(document.name);
      documentService.setContent(document.content);
      documentService.setId(null);
    }
    toast(message);
  }

  static async export() {
    const documentStore = getDocumentStore();
    const document = {
      name: documentStore.name,
      content: documentStore.content,
    };
    const { message } = await exportFile(document);
    toast(message);
  }
}

export default DocumentService;
