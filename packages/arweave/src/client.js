import Arweave from 'arweave';
import KeyStore from './keystore';

export class ArClient{
    constructor(){
        this.arweave = Arweave.init({});
        this.keystore = new KeyStore();
        this.GetWallet();
    };

    // key owns wallet. 1 wallet per key. kinda like priv and pub key basically, wallet is pubkey

    async NewKey(){
        const key = this.arweave.generate();
        this.keystore.storeKey("ArKey", key);
        return key;
    };

    async GetWallet(){
        var key;
        try{
            key = this.keystore.loadKey("ArKey");
        }catch(e){
            this.NewKey();
        }
        const wallet = await this.arweave.wallets.jwkToAddress(key);
        this.wallet = wallet;
    }

    async GetLastTransaction(){
        if(!this.wallet){
            console.log("no wallet created");
            return undefined;
        }

        const transaction = await this.arweave.wallets.getLastTransactionID(this.wallet);
        console.log("last transaction id: ", transaction);
        return this.transaction;
    }

    async UploadLargeData(data){
        if(!this.wallet){
            return "no wallet";
        }
        let transaction = await this.arweave.createTransaction({
                data: data
            },
            this.wallet
        );

        await this.arweave.transactions.sign(transaction, this.wallet);

        let uploader = await this.arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
    }

    async UploadLSmallData(data){
        if(!this.wallet){
            return "no wallet";
        }
        let transaction = await this.arweave.createTransaction({
            data: data},
        this.wallet);

        await this.arweave.transactions.sign(transaction, this.wallet);

        await this.arweave.transactions.post(transaction);
    }
}
