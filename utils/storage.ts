export default class Storage {
  public static save(key: string, value: string) {
    if (window?.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  public static get(key: string): unknown {
    if (window?.localStorage) {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    }
  }

  public static delete(key: string) {
    if (window?.localStorage) {
      localStorage.removeItem(key);
    }
  }
}
