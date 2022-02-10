import keystore from "./keystore";

export default class WsClient {
    constructor(name){
      this.username = name;
      this.socket = new WebSocket("ws://localhost:8080/ws");
      this.keystore = new keystore();

      this.socket.onmessage = this.decryptMessage;

      this.socket.onclose = function(event){
        console.log("socket closed? if you are a developer, check the chat backend. something went wrong");
      };
    }

    addRecipient(publicKey, name){
      this.keystore.deriveSharedKey(publicKey, name);
    }

    sendMessage(text, recipient){
      let dk = this.keystore.loadSharedKey(recipient);
      let encrypted = this.keystore.encrypt(text, dk);
      let data = this.username + ":" + encrypted;

      //todo: add rest of send logic (subscribing to channel first)
    }

    decryptMessage(event){
      let text = event.data;
      let name = text.substring(0, text.indexOf(":"));
      let encrypted = text.substring(text.indexOf(":")+1);
      let dk = this.keystore.loadSharedKey(name);
      return this.keystore.decrypt(encrypted, dk);
    }
}