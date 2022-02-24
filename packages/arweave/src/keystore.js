export default class KeyStore{
    constructor(){
        this.wallet;
        this.key;
        this.loadKeys();
    }

    // i think this also returns a promise. should be awaited
    // then keys can be used
    loadKey(name){
      this.accessDB(function (store) {
        var getData = store.get(name);
        getData.onsuccess = function(event) {
          var key = event.target.result.key;
          console.log("your key: ", key);
          return key;
        };

        getData.onfailure()

      })
    }

    accessDB(fn_) {
      // Open (or create) the database
      var open = indexedDB.open("ArweaveDB");
    
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

    storeKey(name, key){
      this.accessDB(function (store) {
        store.put({name: name, key: key});
      });
    }
}