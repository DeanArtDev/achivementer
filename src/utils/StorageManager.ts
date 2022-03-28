class StorageManager {
  static setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  static getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  static removeItem(keys: string[]): void {
    keys.forEach((k) => window.localStorage.removeItem(k));
  }
}

export default StorageManager;
