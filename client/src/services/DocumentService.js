import { getModalServices } from "../stores/ModalStore.js";
import {
  getDocumentStore,
  getDocumentServices,
} from "../stores/DocumentStore.js";
import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import emptyDocument from "../json/emptyDocument.json";

class DocumentService {
  /* 
    External
  */

  static create() {
    const documentService = getDocumentServices();
    documentService.setName(emptyDocument.name);
    documentService.setContent(emptyDocument.content);
    documentService.setId(null);
    toast("Документ создан");
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
