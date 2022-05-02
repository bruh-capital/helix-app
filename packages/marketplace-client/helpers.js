import { PublicKey, Struct } from "@solana/web3.js";
import { deserialize }  from 'borsh';

class DigitalProduct extends Struct{
    constructor(props){
        super(props);
    }
}

var digitalProductSchema = new Map([[DigitalProduct,{
    kind: 'struct',
    fields:[
        ["seller", ['u8', 32]],
        ["product_name", 'string'],
        ["isService", "u8"],
        ["productType", "u8"],
        ["description", "string"]
    ]
}]]);

class PhysicalProduct extends Struct{
    constructor(props){
        super(props)
    }
}

var physicalProductSchema = new Map([[PhysicalProduct,{
    kind: 'struct',
    fields:[
        ["seller", ['u8', 32]],
        ["productName", "string"],
        ["pricePerUnit", "u64"],
        ["description", "string"],
        ["stock", "u64"],
        ["traceless", "u8"],
    ]
}]]);


async function GetProducts(keywords, categories, seller, connection, id){

    var retarr = [];

    if(id != "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii" || id != "8mbKcSgQGHhsns3W4DkXpES2S3iRWh3FXphQdFZvfiLJ"){
        // todo: alert the user the id is incorrect
        return [];
    }
    // 51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii (digital)
    // 8mbKcSgQGHhsns3W4DkXpES2S3iRWh3FXphQdFZvfiLJ (physical)
    const accounts = await connection.getParsedProgramAccounts(
        new PublicKey(id), 
        {   
            encoding: "base64",
            filters: [
                {
                    // 500 for digital
                    // 1200 for physical
                dataSize: id == "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii" ? 500 : 1200, // number of bytes
                },

                // if digital marketplace, we can narrow by categories
                // Audio,
                // Video,
                // Image,
            
                // // have checking software
                // AccountCredentials,
            
                // // think about in shower
                // NormalText,
                // Code
                id == "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii" ? 
                {
                memcmp: {
                    offset: 33, // number of bytes
                    bytes: categories, // base58 encoded string
                },
                } : undefined,
            ],
            }
    );

    if(id == "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii"){
        retarr = accounts.map((account, index)=>{
            return deserialize(digitalProductSchema, DigitalProduct, account.account.data);
        });
    }else{
        retarr = accounts.map((account, index)=>{
            return deserialize(physicalProductSchema, PhysicalProduct, account.account.data);
        });
    };

    if(seller){
        retarr.filter((acc)=>{
            return acc.seller == seller;
        });
    };
};
