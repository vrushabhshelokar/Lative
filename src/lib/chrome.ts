// Safe wrapper for chrome extension storage APIs to enable testing outside extension environments

export interface ChromeStorage {
  get: (key: string, defaultValue: unknown) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<void>;
}

export const safeStorage: ChromeStorage = {
  get: async (key: string, defaultValue: unknown): Promise<unknown> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key] !== undefined ? result[key] : defaultValue);
        });
      });
    }
    // Fallback for non-extension environments (e.g., local Vite dev preview)
    if (typeof localStorage !== 'undefined') {
      const val = localStorage.getItem(key);
      if (val !== null) {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
    }
    return defaultValue;
  },

  set: async (key: string, value: unknown): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, resolve);
      });
    }
    // Fallback for non-extension environments
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};
