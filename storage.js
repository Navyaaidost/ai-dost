// Drop-in replacement for the window.storage API that Claude.ai artifacts
// provide automatically. Mirrors the same shape using the browser's
// localStorage so the rest of App.jsx needs no changes.

const PREFIX = 'disha:';

export const storage = {
  async get(key, shared = false) {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) {
      throw new Error(`Key "${key}" not found`);
    }
    return { key, value: raw, shared };
  },

  async set(key, value, shared = false) {
    localStorage.setItem(PREFIX + key, value);
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    localStorage.removeItem(PREFIX + key);
    return { key, deleted: true, shared };
  },

  async list(prefix = '', shared = false) {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX + prefix)) {
        keys.push(k.slice(PREFIX.length));
      }
    }
    return { keys, prefix, shared };
  },
};
