const helpers = require("./helpers");

export default class KeyStore{
    constructor(){
        this.pubKey;
        this.privKey;
        this.loadKeys();
    }

    // i think this also returns a promise. should be awaited
    // then keys can be used
    loadKeys(){
      this.accessDB(function (store) {
        var getData = store.get("self");
        getData.onsuccess = function(event) {
          var keys = event.target.result.keys;
          this.pubKey = keys.pub;
          this.privKey = keys.priv;
          console.log("decrypted data", data);
        };

        getData.onerror = function (event){
          console.log("your keys have not been made yet :(");
          console.log("generating...");
          this.genKeyPair();
        };

      })
    }

    // i think this returns a promise
    loadSharedKey(name){
      this.accessDB(function (store) {
        var getData = store.get("self");
        getData.onsuccess = function(event) {
            console.log("fetched shared key for: ", name);
            return event.target.result.keys.shared;
        };

        getData.onerror = function (event){
          console.log("your keys have not been made yet");
        };

      })
    }

    accessDB(fn_) {
      // Open (or create) the database
      var open = indexedDB.open("keyDB");
    
      // Create the schema
      open.onupgradeneeded = function(event) {
          var db = event.target.result;
          db.createObjectStore("keyStore", {keyPath: "name"});
      };
    
    
      open.onsuccess = function(event) {
          // Start a new transaction
          var db = event.target.result;
          var tx = db.transaction("keyStore", "readwrite");
          var store = tx.objectStore("keyStore");
    
          fn_(store)
    
          // Close the db when the transaction is done
          tx.oncomplete = function() {
              db.close();
          };
      }
    }

    async genKeyPair() {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "ECDH",
            namedCurve: "P-256",
          },
          true,
          ["deriveKey", "deriveBits"]
        );
      
        this.accessDB(function (store) {
          store.put({name: "self", keys: {pub: publicKeyRaw, priv :privateKeyRaw}});
        });

        this.pubKey = keyPair.publicKey;
        this.privKey = keyPair.privateKey;
        
        console.log("generated and set keypair");
    };

    async deriveSharedKey(publicKeyPem, sender) {
      console.log("deriving shared key");
      const publicKey = await window.crypto.subtle.importKey(
          "spki",
          helpers.convertPemToBinary(publicKeyPem),
          {
          name: "ECDH",
          namedCurve: "P-256",
          },
          true,
          []
      );
    
    //   const privateKey = await window.crypto.subtle.importKey(
    //     "raw",
    //     privateKeyRaw,
    //     {
    //       name: "ECDH",
    //       namedCurve: "P-256",
    //     },
    //     true,
    //     ["deriveKey", "deriveBits"]
    //   );

      const privateKey = this.privkey;
    
      const sharedKey = await window.crypto.subtle.deriveKey(
          { name: "ECDH", public: publicKey },
          privateKey,
          { name: "AES-GCM", length: 256 },
          true,
          ["encrypt", "decrypt"]
      );

      this.accessDB(function (store) {
          store.put({name: sender, keys: {shared: sharedKey}});
      })

      console.log("derived and stored shared key for: ", sender);

      return sharedKey;
    };

    async encrypt(text, derivedKey) {
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

    async decrypt(messageJSON, derivedKey) {
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

    async exportPubKey(){
      return await helpers.exportPublicKey(this.pubkey)
    }

    closeChat(recipient){
      this.accessDB(function (store) {
        store.delete(recipient);
      });
    }
}