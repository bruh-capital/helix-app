export default class Connector {
    constructor(){
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.db;
        let openRequest = indexedDB.open("helixchat");
        let [pubkey, privkey] = this.genKeyPair();

        openRequest.onerror = function(event) {
            // Do something with request.errorCode!
        };
        openRequest.onsuccess = function(event) {
            this.db = event.target.result;
        };
    }

    genKeyPair() {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "ECDH",
            namedCurve: "P-256",
          },
          true,
          ["deriveKey", "deriveBits"]
        );
      
        const publicKeyJwk = await window.crypto.subtle.exportKey(
          "jwk",
          keyPair.publicKey
        );
      
        const privateKeyJwk = await window.crypto.subtle.exportKey(
          "jwk",
          keyPair.privateKey
        );
      
        return { publicKeyJwk, privateKeyJwk };
      };

      deriveSharedKey(publicKeyJwk, privateKeyJwk) {
        const publicKey = await window.crypto.subtle.importKey(
          "jwk",
          publicKeyJwk,
          {
            name: "ECDH",
            namedCurve: "P-256",
          },
          true,
          []
        );
      
        const privateKey = await window.crypto.subtle.importKey(
          "jwk",
          privateKeyJwk,
          {
            name: "ECDH",
            namedCurve: "P-256",
          },
          true,
          ["deriveKey", "deriveBits"]
        );
      
        return await window.crypto.subtle.deriveKey(
          { name: "ECDH", public: publicKey },
          privateKey,
          { name: "AES-GCM", length: 256 },
          true,
          ["encrypt", "decrypt"]
        );
      };

      encrypt(text, derivedKey) {
        const encodedText = new TextEncoder().encode(text);
      
        const encryptedData = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv: new TextEncoder().encode("Initialization Vector") },
          derivedKey,
          encodedText
        );
      
        const uintArray = new Uint8Array(encryptedData);
      
        const string = String.fromCharCode.apply(null, uintArray);
      
        const base64Data = btoa(string);
      
        return base64Data;
      };

      decrypt(messageJSON, derivedKey) {
        try {
          const message = JSON.parse(messageJSON);
          const text = message.base64Data;
          const initializationVector = new Uint8Array(message.initializationVector).buffer;
      
          const string = atob(text);
          const uintArray = new Uint8Array(
            [...string].map((char) => char.charCodeAt(0))
          );
          const algorithm = {
            name: "AES-GCM",
            iv: initializationVector,
          };
          const decryptedData = await window.crypto.subtle.decrypt(
            algorithm,
            derivedKey,
            uintArray
          );
      
          return new TextDecoder().decode(decryptedData);
        } catch (e) {
          return `error decrypting message: ${e}`;
        }
      };
}