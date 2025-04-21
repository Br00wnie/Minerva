import { getModalServices } from "../stores/ModalStore.js";
import { getStyleStore, getStyleServices } from "../stores/StyleStore.js";
import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import defaultStyle from "../json/defaultStyle.json";

class StyleService {
  /* 
    External
  */

  static create({ styleName, styleDescription }) {
    const styleService = getStyleServices();
    styleService.setName(styleName);
    styleService.setContent(defaultStyle.content);
    styleService.setId(null);
    styleService.setDescription(styleDescription || defaultStyle.description);
    styleService.setPopularity(0);
    styleService.setIsPublic(false);
    toast(`Создан стиль ${styleName}`);
    getModalServices().closeModal();
  }

  static async import() {
    const { success, message, file: style } = await importFile();
    if (success) {
      if (!style.name) {
        toast("Не найдено имя стиля");
        return;
      }
      if (!style.content) {
        toast("Не найдено содержимое стиля");
        return;
      }
      const styleService = getStyleServices();
      styleService.setName(style.name);
      styleService.setContent(style.content);
      styleService.setId(null);
      styleService.setDescription(
        style.description || defaultStyle.description
      );
      styleService.setPopularity(0);
      styleService.setIsPublic(false);
    }
    toast(message);
  }

  static async export() {
    const styleStore = getStyleStore();
    const style = {
      name: styleStore.name,
      content: styleStore.content,
      description: styleStore.description,
    };
    const { message } = await exportFile(style);
    toast(message);
  }
}

export default StyleService;
