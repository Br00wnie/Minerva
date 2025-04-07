const importFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return reject({ message: "Файл не выбран", success: false });
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (typeof reader.result !== "string")
            return reject({ message: "Некорректный формат", success: false });
          const file = JSON.parse(reader.result);
          resolve({ message: "Файл импортирован", file, success: true });
        } catch (e) {
          reject({ message: "Файл повреждён", success: false });
        }
      };
      reader.onerror = () => {
        reject({
          message: "Не удалось импортировать файл из-за непредвиденной ошибки",
          success: false,
        });
      };
      reader.readAsText(file);
    };
    input.click();
  });
};

export default importFile;
