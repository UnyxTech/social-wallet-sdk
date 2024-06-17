import { sha256 } from 'js-sha256';
import CryptoJS from "crypto-js";

export const decryptInfo = (encyrpted: string, clientId: string) => {
  const key = sha256(clientId)
  const buf = Buffer.from(key, 'ascii')
  const buf16 = buf.slice(0, 16)
  const bufstr = buf16.toString('hex')
  const keyBuf = CryptoJS.enc.Hex.parse(bufstr);
  
  const encryptedWordArray = CryptoJS.enc.Base64.parse(encyrpted);
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedWordArray } as any, keyBuf, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedStr)
}
