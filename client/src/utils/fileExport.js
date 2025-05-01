import { saveAs } from "file-saver";
import i18n from "@src/i18n";

const exportFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([JSON.stringify(file, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, `${file.name}.json`);
      resolve({
        message: i18n.t("fileExport.fileReadyToExport"),
        success: true,
      });
    } catch {
      reject({
        message: i18n.t("fileExport.unexpectedError"),
        success: false,
      });
    }
  });
};

export default exportFile;
