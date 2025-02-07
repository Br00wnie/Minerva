class CommonError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// Указаны недопустимые параметры пагинации
class InvalidPaginationParamsError extends CommonError {
  constructor() {
    super("Недопустимые параметры пагинации", 400);
  }
}

module.exports = {
  InvalidPaginationParamsError,
};
