import { WebBundlr } from "@bundlr-network/client";
import { AudioChunker } from "./audio_chunker";
import { ImageChunker } from "./image_chunker";
import { KeyStore } from "keystore";

export class BundlrClient{
    constructor(provider){
        this.keystore = new KeyStore();
        this.keystore.loadRsaKeys();

        if(provider){
            this.bundlr = new WebBundlr("https://node1.bundlr.network", "solana", provider);
        }
    }

    async uploadFile(file, filetype, solTxAddr) {
        // let buyerEncPubkey = (await MarketplaceAccountsClient.GetAccount(buyerAddress)).rsaPubkey;
        let uploader = new Uploader(this.sendToBundlr, solTxAddr);
        uploader.readFile(file, filetype);
    };

    async sendToBundlr(arrayBuffers, solTxAddr){
        let skArr = [];
        let chunkArr = [];
        for(let ab of arrayBuffers){
            let [pk, sk] = await this.keystore.genRsaKp();
            let buffStr = this.keystore.encData(this.keystore.ab2str(ab), pk);

            let pkStr = await this.keystore.exportRsaPubKey(pk);
            let skStr = await this.keystore.exportRsaPrivKey(sk);

            chunkArr.push(pkStr + "endchunkkey" + buffStr + "endchunkbuffer");
            skArr.push(skStr);
        };

        let res = await this.bundlr.uploader.upload(file, [{ name: "helix-digital-tx", value: solTxAddr }]);
        this.keystore.setKeyVal(solTxAddr, skArr);

        return res.data.id;
    }
}

// reader.result (array buffer), filetype, buyer address
// read as data url for image
// read as array buffer for audio
export class Uploader{
    constructor(finishCallback, solTxAddr){
        this.byteBuffer  = [];// list of array buffers
        this.filetype = undefined;
        this.finishCallback = finishCallback;
        this.solTxAddr = solTxAddr;
    }

    readFile(file, filetype){
        let reader = new FileReader();
        this.filetype = filetype;
        switch(filetype.split('/')[0]){
            case "image":
                reader.onload = (event)=>{
                    ImageChunker(event.target.result, this.pushToBuffer, filetype); // image/png
                };
                reader.readAsDataURL(file);
                break;
            case "audio":
                reader.onload = (event)=>{
                    AudioChunker(event.target.result, this.pushToBuffer, filetype);
                };
                reader.readAsArrayBuffer(file);
                break;
        };
    }

    pushToBuffer(arrBuf, isDone){
        this.byteBuffer.push(arrBuf);
        if(isDone){
            this.finishCallback(this.byteBuffer, this.solTxAddr);
        };
    };
}