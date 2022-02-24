import Arweave from 'arweave';
import KeyStore from './keystore';

export class ArClient{
    constructor(){
        this.arweave = Arweave.init({});
        this.keystore = new KeyStore();
    };

    // key owns wallet. 1 wallet per key. kinda like priv and pub key basically, wallet is pubkey

    async NewKey(){
        const key = this.arweave.generate();
        this.keystore.storeKey("ArKey", key);
    };

    async GetWallet(){
        const key = this.keystore.loadKey("ArKey");
        const wallet = await this.arweave.wallets.jwkToAddress(key);
        this.wallet = wallet;
    }

    async GetLastTransaction(){
        const transaction = await this.arweave.wallets.getLastTransactionID(this.wallet);
        console.log("last transaction id: ", transaction);
        return this.transaction;
    }

    async UploadLargeData(data){
        let transaction = await this.arweave.createTransaction({
            data: data},
        key);

        await this.arweave.transactions.sign(transaction, key);

        let uploader = await this.arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
    }

    async UploadLSmallData(data){
        let transaction = await this.arweave.createTransaction({
            data: data},
        key);

        await this.arweave.transactions.sign(transaction, key);

        await this.arweave.transactions.post(transaction);
    }
}
