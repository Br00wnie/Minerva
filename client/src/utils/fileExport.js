import { saveAs } from "file-saver";

const exportFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([JSON.stringify(file, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, `${file.name}.json`);
      resolve({ message: "Файл готов к экспорту", success: true });
    } catch (e) {
      reject({
        message: "Во время экспорта файла возникла непредвиденная ошибка",
        success: false,
      });
    }
  });
};

export default exportFile;
