import keystore from "./keystore";

export default class WsClient {
    // lowkey, name should be the str representation of the shit
    constructor(name){
      // should be anchor pubkey
      this.username = name;
      this.socket = new WebSocket("ws://localhost:8080/ws?username="+name);
      this.keystore = new keystore();

      this.socket.onmessage = this.filterMessageType;
    }

    addRecipient(publicKey, name){
      this.keystore.deriveSharedKey(publicKey, name);
    }

    ///{
    // content:""
    // channel:""
    // command:0,1 [chat, sync]
    // err:""
    ///}
    sendMessage(text, recipient){
      let dk = this.keystore.loadSharedKey(recipient);
      let encrypted = this.keystore.encrypt(text, dk);
      let data = this.username + ":" + encrypted;
      this.WebSocket.sendMessage(JSON.stringify({
        content:data,
        channel:recipient,
        command:0,
      }));
    }

    filterMessageType(event){
      let text = event.data;
      let retArr = [];
      if(text[0] == "["){
        for(let message of JSON.parse(text)){
          retArr.push(this.decryptMessage(message));
        }
      }else{
        retArr.push(this.decryptMessage(text));
      }

      return retArr;
    }

    decryptMessage(text){
      let name = text.substring(0, text.indexOf(":"));
      let encrypted = text.substring(text.indexOf(":")+1);
      let dk = this.keystore.loadSharedKey(name);
      return this.keystore.decrypt(encrypted, dk);
    }

    fetchMessages(){
      this.keystore.sendMessage(JSON.stringify({
        command:1
      }))
    }

    closeChat(recipient){
      this.keystore.closeChat(recipient);
    }
}