const STORAGE_PREFIX = "minerva_";

class Storage {
  static read(key) {
    key = STORAGE_PREFIX + key;
    const value = localStorage.getItem(key);
    return value;
  }

  static write(key, value) {
    key = STORAGE_PREFIX + key;
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }

  static remove(key) {
    key = STORAGE_PREFIX + key;
    localStorage.removeItem(key);
  }

  static has(key) {
    key = STORAGE_PREFIX + key;
    return localStorage.getItem(key) !== null;
  }

  static clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    });
  }
}

export default Storage;
