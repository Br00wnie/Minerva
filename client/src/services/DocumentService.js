import { getModalServices } from "@stores/ModalStore";
import { getDocumentStore, getDocumentServices } from "@stores/DocumentStore";
import toast from "@utils/toast";
import exportFile from "@utils/fileExport";
import importFile from "@utils/fileImport";
import emptyDocument from "@public/json/document/emptyDocument.json";
import parse from "html-react-parser";
import i18n from "@src/i18n";

class DocumentService {
  /* 
    External
  */

  static reset() {
    const documentService = getDocumentServices();
    documentService.setName(emptyDocument.name);
    documentService.setContent(emptyDocument.content);
    documentService.setId(null);
    toast(i18n.t("services.document.resetDone"));
    getModalServices().closeModal();
  }

  static async import() {
    const { success, message, file: document } = await importFile();
    if (success) {
      if (
        !Object.hasOwn(document, "name") ||
        typeof document.name !== "string"
      ) {
        toast(i18n.t("services.document.nameNotFound"));
        return;
      }
      if (
        !Object.hasOwn(document, "content") ||
        typeof document.content !== "string"
      ) {
        toast(i18n.t("services.document.contentNotFound"));
        return;
      }
      try {
        parse(document.content);
      } catch {
        toast(i18n.t("services.document.notCorrectContentStructure"));
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
