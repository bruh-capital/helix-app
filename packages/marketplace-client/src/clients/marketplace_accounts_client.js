import * as anchor from "@project-serum/anchor";
import { SystemProgram, PublicKey, Connection} from "@solana/web3.js";
let accounts_idl = require("../idls/marketplace_accounts.json");

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS
export class MarketplaceAccountsClient {
	constructor(wallet, connection, provider){
		this.accounts_programid = new PublicKey(accounts_idl.metadata.address);
        
        if(!wallet){
            return
        }
        this.wallet = wallet;
        this.connection = connection;
        this.provider = provider;

		this.PostWalletConsts();

        this.accounts_program = new anchor.Program(accounts_idl, accounts_idl.metadata.address, this.provider);
	}

	PostWalletConsts = async()=>{
		const [marketAccountAddress, marketAccountBump] = new PublicKey.findProgramAddress(
			[
				Buffer.from("marketaccount"),
				this.wallet.PublicKey.toBuffer()
			],
			this.accounts_programid
		)

		this.marketAccountAddress = marketAccountAddress;
		this.marketAccountBump = marketAccountBump;
	}


	ChangeAccountName = async(new_username)=>{
		await this.accounts_program.rpc.changeAccountName(new_username,{
			marketAccount: this.marketAccountAddress,
			walletAddress: this.wallet.PublicKey,
		})
	}
	CreateAccount = async()=>{
		await this.accounts_program.rpc.createAccount(username, {
			accounts:{
				marketAccount: this.marketAccountAddress,
				payer: this.wallet.PublicKey,
				systemProgram: SystemProgram.programId
			}
		})
	}

	// add rsa public key
	AddRsaPubkey = async(key)=>{
		await this.accounts_program.rpc.addRsaPubkey(key, {
			accounts:{
				walletAddress: this.wallet.PublicKey,
				marketAccount: this.marketAccountAddress,
			}
		})
	}

	// todo
	GetProducts = async() =>{

	}

	GetAccount = async(account_address) =>{
		let marketaccount_pk = new PublicKey(account_address);
		return await this.accounts_program.account.MarketAccount(marketaccount_pk);
	}
}