class DocumentError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// Документ с заданным именем уже есть у пользователя
class DocumentNameExistsError extends DocumentError {
  constructor() {
    super("Документ с таким именем уже существует", 409);
  }
}

module.exports = {
  DocumentNameExistsError,
};
