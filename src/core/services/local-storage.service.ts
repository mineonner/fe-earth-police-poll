
import * as CryptoJS from 'crypto-js';
import { EncryptStorage } from '@storage-encryption/storage-encryption';


export const localStorageKey = "ve5DGTAU4eJgF+OINdqfug==";
export const encryptStorage = new EncryptStorage(localStorageKey, 'localStorage');

export function setItemLocalStorage(key: string, value: string) {
  try {
    encryptStorage.encrypt(key, value);
  } catch (error) { }
}

export function getItemLocalStorage(key: string) {
  try {
    return encryptStorage.decrypt(key) || "";
  } catch (error) { }
}

export function removeItemLocalStorage(key: string) {
  try {
    encryptStorage.remove(key);
  } catch (error) { }
}

export function encrypt(txt: string): string {
  return CryptoJS.AES.encrypt(txt, localStorageKey).toString();
}

export function decrypt(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, localStorageKey).toString(CryptoJS.enc.Utf8);
}


