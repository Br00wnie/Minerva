class Storage {
  static read(key) {
    return localStorage.getItem(key);
  }

  static write(key, value) {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default Storage;
