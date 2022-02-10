export default class Connector {
    constructor(){
      this.socket = new WebSocket("ws://localhost:8080/ws");
    }
}