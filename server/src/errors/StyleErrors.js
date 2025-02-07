class StyleError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// Стиль с заданным именем уже есть у пользователя
class StyleNameExistsError extends StyleError {
  constructor() {
    super("Стиль с таким именем уже существует", 409);
  }
}

// Стиль недоступен, так как приватный
class PrivateStyleAccessError extends StyleError {
  constructor() {
    super("Стиль недоступен, так как приватный", 403);
  }
}

// Попытка обновить публичный стиль
class PublicStyleUpdateError extends StyleError {
  constructor() {
    super("Публичные стили нельзя изменять", 403);
  }
}

module.exports = {
  StyleNameExistsError,
  PrivateStyleAccessError,
  PublicStyleUpdateError,
};
