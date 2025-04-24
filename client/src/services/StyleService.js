import { getModalServices } from "../stores/ModalStore.js";
import { getStyleStore, getStyleServices } from "../stores/StyleStore.js";
import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import defaultStyle from "../json/defaultStyle.json";
import styleMeta from "../json/styleMeta.json";

class StyleService {
  /* 
    External
  */

  static reset() {
    const styleService = getStyleServices();
    styleService.setName(defaultStyle.name);
    styleService.setContent(defaultStyle.content);
    styleService.setId(null);
    styleService.setDescription(defaultStyle.description);
    styleService.setPopularity(0);
    styleService.setIsPublic(false);
    toast("Стиль сброшен");
    getModalServices().closeModal();
  }

  static async import() {
    const { success, message, file: style } = await importFile();
    if (success) {
      if (!style.hasOwnProperty("name") || typeof style.name !== "string") {
        toast("Не найдено имя стиля");
        return;
      }
      if (
        !style.hasOwnProperty("content") ||
        typeof style.content !== "object" ||
        style.content === null
      ) {
        toast("Не найдено содержимое стиля");
        return;
      }
      const content = {}; // сюда будем заносить
      Object.keys(styleMeta).forEach((key) => {
        if (styleMeta[key].type === "color") {
          // проверяем, чтобы в style.content[key] была строка цвета,
          // иначе заносим в content значение из defaultStyle[key]
        }
        if (styleMeta[key].type === "number") {
          // проверяем, чтобы в style.content[key] было число,
          // если есть styleMeta[key].min, styleMeta[key].max
          // или styleMeta[key].step, нужно проверить число,
          // иначе заносим в content значение из defaultStyle[key]
        }
        if (styleMeta[key].type === "string") {
          // проверяем, чтобы в style.content[key] была строка,
          // иначе заносим в content значение из defaultStyle[key]
        }
        if (styleMeta[key].type === "select") {
          // проверяем, чтобы в style.content[key] была строка,
          // которая есть в одном из styleMeta[key].options[n].value
          // иначе заносим в content значение из defaultStyle[key]
        }
      });
      const styleService = getStyleServices();
      styleService.setName(style.name);
      styleService.setContent(content);
      styleService.setId(null);
      styleService.setDescription(
        String(style.description) || defaultStyle.description
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
    };
    const { message } = await exportFile(style);
    toast(message);
  }
}

export default StyleService;
