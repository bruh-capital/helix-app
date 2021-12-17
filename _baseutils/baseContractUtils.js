import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import * as idl from '@idl/twst.json';
import { SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import { TREASURY_PUBKEY } from "./treasuryVariables";
import * as pythUtils from "./pythUtils";

// TODO: PYTH CLIENT MAGIC!

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS

export class HelixNetwork {
	constructor(wallet){
		// system program programid
		this.SYSTEM_PROGRAM_ID = SystemProgram.programId;
		this.PROGRAM_ID = new PublicKey(idl.metadata.address);
		this.connection = new Connection('http://localhost:8899');
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions())   
		this.program = new anchor.Program(idl, this.PROGRAM_ID, this.provider);
		this.programMultisigWallet = anchor.web3.Keypair.fromSecretKey(Uint8Array.from([129,120,182,228,196,158,63,17,41,199,69,153,125,205,238,247,124,231,160,96,137,101,247,246,66,241,145,144,180,195,125,19,90,87,80,176,36,52,249,53,169,199,213,208,207,182,87,248,108,210,169,1,214,195,71,34,118,172,224,198,217,60,2,68]));
		this.wallet = wallet;
		this.CreateUserATA();
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS
	// program default functions
	
	InitializeUserVault = async () => {
		console.log("initializing user vault");
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.initUserVault(userVaultBump,
			{
				accounts:{
				userAccount: userVault,
				payer: this.wallet.publicKey,
				user: this.wallet.publicKey,
				systemProgram: this.SYSTEM_PROGRAM_ID,
			},
			signers:[this.wallet.Keypair],
		});
	}
	
	CreateUserATA = async () => {
		console.log("creating user ata");
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.SYSTEM_PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.initUserAta({
				userBump: userATABump,
				mintBump: mintBump,
			},
			{
				accounts:{
					userAta: userATA,
					payer: this.wallet.publicKey,
					user: this.wallet.publicKey,
					rent: web3.SYSVAR_RENT_PUBKEY,
					mint: mintAccount,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: this.SYSTEM_PROGRAM_ID,
				},
				signers:[this.wallet.Keypair],
			}
		);
	}
	
	//////////////////////////////////
	// user callable functions
	DepositAssetPrintBond = async (asset_amount) => {
		console.log("deposit asset, print bond");
		const url = clusterApiUrl("devnet");
		// full list at:
		// https://pyth.network/developers/accounts/?cluster=devnet#
		const SolProductKey = 'J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix';
		const connection = new Connection(url);
		const publicKey = new PublicKey(SolProductKey);
		const SolData = await connection.getAccountInfo(publicKey);
		const SolPriceInfo = pythUtils.parsePriceData(SolData.data);
		//gives sol in terms of usd
		const SolPrice = SolPriceInfo.aggregate.price;

		const bond_amount = SolPrice;
	
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
	
		try{
			await this.program.rpc.depositAsset(userVaultBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
				accounts:{
				userWallet: this.wallet.publicKey,
				treasuryWallet: TREASURY_PUBKEY,
				userVault: userVault,
				systemProgram: this.SYSTEM_PROGRAM_ID,
				},
				signers:[this.wallet.Keypair],
			})
		}catch(e){
			console.log(e);
			console.log("likely insufficient funds");
		}
	}
	
	RedeemBonds = async () => {
		console.log("redeeming bonds");
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.SYSTEM_PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.redeemBonds({
			userVaultBump: userVaultBump,
			userAtaBump: userATABump,
			mintBump: mintBump,
		},{
			accounts:{
			user: this.wallet.publicKey,
			userData: userVault,
			mint: mintAccount,
			userAta: userATA,
			tokenProgram: TOKEN_PROGRAM_ID,
			systemProgram: this.SYSTEM_PROGRAM_ID,
			},
		});
	}
	
	// stake amount is in twst
	Stake = async(amount) => {
		console.log("staking");
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA,] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
	
		await this.program.rpc.stake({
			userVault: userVaultBump,
			userAta: userATABump,
			protocolData: protocolDataBump,
		},
		new anchor.BN(amount),
		{
			accounts:{
			userAta: userATA,
			protocAta: protocolATA,
			userVault: userVault,
			protocolData: protocolDataAccount,
			user: this.wallet.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
			},
			signers:[this.wallet.Keypair],
		});
	}
	
	// unstake amount is stwst
	Unstake = async (amount) => {
		console.log("unstaking");
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA,] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.unstake({
			userVault: userVaultBump,
			userAta: userATABump,
			protocolData: protocolDataBump,
		}, new anchor.BN(amount),{
			accounts:{
			user: this.wallet.publicKey,
			userAta: userATA,
			userVault: userVault,
			protocolData: protocolDataAccount,
			protocAta: protocolATA,
			tokenProgram: TOKEN_PROGRAM_ID,
			tokenAuthority: this.programMultisigWallet.publicKey,
			},
		});
	}
}