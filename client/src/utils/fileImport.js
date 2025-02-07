export const importFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const rawData = event.target.files[0];
      if (!rawData)
        return reject({ message: "Файл не выбран", importedFile: null });
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const importedFile = JSON.parse(reader.result);
          resolve({
            message: "Файл импортирован",
            importedFile,
          });
        } catch (e) {
          reject({
            message: "Файл повреждён",
            importedFile: null,
          });
        }
      };
      reader.onerror = () => {
        reject({
          message: "Не удалось импортировать файл из-за непредвиденной ошибки",
          importedFile: null,
        });
      };
      reader.readAsText(rawData);
    };
    input.click();
  });
};
