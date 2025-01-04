const prefix = '[er-decision-making-tool] ';

const withPrefix = (key: string): string => `${prefix}${key}`;

export const LSService = {
  get(key: string): unknown {
    return JSON.parse(localStorage.getItem(withPrefix(key)) ?? 'null');
  },
  set(key: string, value: unknown): void {
    localStorage.setItem(withPrefix(key), JSON.stringify(value));
  },
};

export const LocalStorageService = LSService;

export default LSService;
