import { saveAs } from "file-saver";
import { read } from "./storageManagement";

export const exportFile = (key) => {
  let message;
  let exportedFile;
  let rawData = read(key);
  if (!rawData) {
    return { message: "Файл ещё не сохранён в Local Storage", rawData: null };
  }
  try {
    const parsedData = JSON.parse(rawData);
    exportedFile = JSON.stringify(parsedData, null, 2);
    const blob = new Blob([exportedFile], {
      type: "application/json",
    });
    saveAs(blob, `${parsedData.name}.json`);
    message = "Файл готов к экспорту";
  } catch (e) {
    message = "Во время экспорта файла возникла непредвиденная ошибка";
  }
  return { exportedFile, message };
};
