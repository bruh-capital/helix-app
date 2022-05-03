import { WebBundlr } from "@bundlr-network/client";
import { AudioChunker } from "./audio_chunker";
import { ImageChunker } from "./image_chunker";
import { MarketplaceAccountsClient } from "marketplace-clients";
import { KeyStore } from "keystore";

export default class BundlrClient{
    constructor(connection, provider){
        this.keystore = new KeyStore();
        this.keystore.loadRsaKeys();
        this.bundlr = new WebBundlr("https://node1.bundlr.network", "solana", provider);
    }
}

// reader.result (array buffer), filetype, buyer address
async function uploadFile(file, filetype, buyerAddress) {
    let buyerEncPubkey = (await MarketplaceAccountsClient.GetAccount(buyerAddress)).rsaPubkey;
    switch(filetype){
        case "image":
            ImageChunker
            break;
        case "audio":
            break;
    };
    let res = await this.bundlr.uploader.upload(file, [{ name: "Content-Type", value: "image/png" }]);
    let address = res.data.id;
};