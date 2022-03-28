class StorageManager {
  static setItem(key: string, value: unknown): void {
    if (typeof value === "string") {
      window.localStorage.setItem(key, value);
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T = string>(key: string): T | null {
    const response = window.localStorage.getItem(key);
    if (!response) return null;
    return JSON.parse(response);
  }

  static removeItem(keys: string[]): void {
    keys.forEach((k) => window.localStorage.removeItem(k));
  }
}

export default StorageManager;
