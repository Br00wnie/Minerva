import { saveAs } from "file-saver";

const exportFile = (file) => {
  try {
    const blob = new Blob([JSON.stringify(file, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `${file.name}.json`);
    return { message: "Файл готов к экспорту", success: true };
  } catch (e) {
    return {
      message: "Во время экспорта файла возникла непредвиденная ошибка",
      success: false,
    };
  }
};

export default exportFile;
