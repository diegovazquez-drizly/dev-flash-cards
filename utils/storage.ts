const KEY = "questionHistory";

export default class Storage {
  public static save(value: string) {
    if (globalThis?.localStorage) {
      localStorage.setItem(KEY, value);
    }
  }

  public static get(): string[] {
    if (globalThis?.localStorage) {
      const item = localStorage.getItem(KEY);
      return JSON.parse(item) ?? [];
    }
  }

  public static delete() {
    if (globalThis?.localStorage) {
      localStorage.removeItem(KEY);
    }
  }
}
