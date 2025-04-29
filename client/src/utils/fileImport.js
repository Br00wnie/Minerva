import i18n from "../i18n";

const importFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file)
        return reject({
          message: i18n.t("fileImport.fileNotSelected"),
          success: false,
        });
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const file = JSON.parse(reader.result);
          resolve({
            message: i18n.t("fileImport.successfulImport"),
            file,
            success: true,
          });
        } catch (e) {
          reject({
            message: i18n.t("fileImport.corruptedFile"),
            success: false,
          });
        }
      };
      reader.onerror = () => {
        reject({
          message: i18n.t("fileImport.unexpectedError"),
          success: false,
        });
      };
      reader.readAsText(file);
    };
    input.click();
  });
};

export default importFile;
