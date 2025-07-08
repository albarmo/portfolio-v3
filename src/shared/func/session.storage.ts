
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY ?? "";
export const secureSessionStorage = {
  getItem: <T>(key: string, initialValue: T): T => {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return initialValue;
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.warn(`Decryption failed for ${key}:`, e);
      return initialValue;
    }
  },

  setItem: <T>(key: string, value: T) => {
    try {
      const stringified = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
      sessionStorage.setItem(key, encrypted);
    } catch (e) {
      console.warn(`Encryption failed for ${key}:`, e);
    }
  },

  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
};
