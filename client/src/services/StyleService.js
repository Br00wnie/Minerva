import { getModalServices } from "../stores/ModalStore.js";
import { getStyleStore, getStyleServices } from "../stores/StyleStore.js";
import toast from "../utils/toast.js";
import exportFile from "../utils/fileExport.js";
import importFile from "../utils/fileImport.js";
import defaultStyle from "../json/defaultStyle.json";
import styleMeta from "../json/styleMeta.json";
import tinycolor from "tinycolor2";

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
      const content = {};
      Object.keys(styleMeta).forEach((key) => {
        const meta = styleMeta[key];
        const value = style.content[key];
        const defaultValue = defaultStyle.content[key];
        switch (meta.type) {
          case "color":
            content[key] = tinycolor(value).isValid() ? value : defaultValue;
            break;
          case "number":
            if (typeof value !== "number" || isNaN(value)) {
              content[key] = defaultValue;
              break;
            }
            let result = value;
            if (meta.min !== undefined) result = Math.max(meta.min, result);
            if (meta.max !== undefined) result = Math.min(meta.max, result);
            if (meta.step !== undefined) {
              const base = meta.min ?? 0;
              result =
                base + Math.round((result - base) / meta.step) * meta.step;
              if (meta.min !== undefined) result = Math.max(meta.min, result);
              if (meta.max !== undefined) result = Math.min(meta.max, result);
            }
            content[key] = result;
            break;
          case "string":
            content[key] = typeof value === "string" ? value : defaultValue;
            break;
          case "select":
            const values = meta.options.map((option) => option.value);
            content[key] = values.includes(value) ? value : defaultValue;
            break;
          default:
            content[key] = defaultValue;
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
