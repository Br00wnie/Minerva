class Storage {
  static read(key) {
    return localStorage.getItem(key);
  }

  static write(key, data) {
    localStorage.setItem(key, data);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default Storage;
