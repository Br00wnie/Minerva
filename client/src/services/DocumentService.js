import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import { nameYup } from "../utils/validation";
import initialDocument from "../components/editor/initialDocument.js";
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
      documentContent: initialDocument.document_content,
      documentId: null,
    });
    toast(`Создан документ ${documentName}`);
    stores.ModalStore.closeModal();
  }

  static async import() {
    const { success, message, file } = await importFile();
    toast(message);
    if (success) {
      if (!file.name) {
        toast("Не найдено имя документа");
        return;
      }
      if (!file.content) {
        toast("Не найдено содержимое документа");
        return;
      }
      stores.DocumentStore.setName(file.name);
      stores.DocumentStore.setContent(file.content);
      stores.DocumentStore.setId(null);
    }
  }

  static async export() {
    const file = stores.DocumentStore.get();
    file.documentId = null;
    const { message } = exportFile(file);
    toast(message);
  }

  /* 
    External
  */
}

export default DocumentService;
