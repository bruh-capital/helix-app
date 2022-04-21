const keystore = require("keystore");
var matrixSdk = require("matrix-js-sdk");

export default class ChatClient{
    constructor(){
        this.MatrixClient = matrixSdk.createClient("https://matrix.org");
        this.keystore = new keystore();
        
        let matrixAccesstoken = this.keystore.getKeyVal("matrixAccessToken");
        if(matrixAccesstoken){
            this.matrixAccessToken = matrixAccesstoken;
        }
    }

    Register(username, password){
        this.MatrixClient.register(username, password).then((res)=>{
            console.log(res);
            this.keystore.setKeyVal("matrixAccessToken", res.access_token);
            this.keystore.setKeyVal("matrixDeviceId", res.device_id);
            this.keystore.setKeyVal("matrixUserId", res.user_id);
            return res.user_id;
        }).catch((e)=>{
            console.log(e);
            return undefined;
        });
    }

    Login(username, password){
        this.MatrixClient.loginWithPassword(username, password).then((res)=>{
            console.log(res);
            let access_token = res.access_token;
            keystore.setKeyVal("matrixAccessToken", access_token);
            this.matrixAccessToken = matrixAccesstoken;
            return access_token;
        }).catch((e)=>{
            console.log(e);
            return undefined;
        });
        
    }

    // todo userid's to invite
    CreatePrivateRoom(invUsers){
        this.MatrixClient.createRoom({
            invite: invUsers,
            // i think this defaults to private but we should check
            visibility: 1,
        }).then((res)=>{
            return res.room_id;
        }).catch((e)=>{
            console.log(e);
            return undefined;
        })
    }


    // join all invited chats
    GetInvites(){
        this.MatrixClient.getRooms().map((room) => {
            if(room.getMyMembership() === "invite"){
                this.JoinRoom(room.roomId);
            }
        });
    }

    JoinRoom(roomId){
        this.MatrixClient.joinRoom(roomId);
    }

    LeaveRoom(roomId){
        this.MatrixClient.leave(roomId);
    }
}