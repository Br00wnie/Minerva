const STORAGE_PREFIX = "minerva_";

class Storage {
  static read(key, isObject = false) {
    key = STORAGE_PREFIX + key;
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return isObject ? JSON.parse(value) : value;
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

  static clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    });
  }
}

export default Storage;
