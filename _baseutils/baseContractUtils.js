import * as anchor from "@project-serum/anchor";
import {PublicKey, Connection} from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import * as idl from '@idl/twst.json';
import { SystemProgram } from "@solana/web3.js";

// todo PYTH CLIENT MAGIC!


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
		this.programMultisigWallet = new PublicKey("75ev4N83x1nDGhDEgkHiedha8XbPxf33HTJSJj28eze7");
		this.wallet = wallet;
		this.CreateUserATA();
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS
	// program default functions
	InitializeMint = async () => {
		console.log("initializing mint");
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.SYSTEM_PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
			
		await this.program.rpc.initMint(mintBump, {
			accounts:{
			mint: mintAccount,
			payer: this.wallet.publicKey,
			systemProgram: this.SYSTEM_PROGRAM_ID,
			tokenProgram: TOKEN_PROGRAM_ID,
			rent: web3.SYSVAR_RENT_PUBKEY,
			},
		});
	}
	
	CreateProtocolATA = async () => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.SYSTEM_PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.initUserAta(
			{
				userBump: protocolATABump,
				mintBump: mintBump,
			},
			{
				accounts:{
					userAta: protocolATA,
					payer: this.wallet.publicKey,
					user: this.wallet.publicKey,
					rent: web3.SYSVAR_RENT_PUBKEY,
					mint: mintAccount,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: this.SYSTEM_PROGRAM_ID,
				},
			}
		);
	}
	
	InitializeProtocolData = async () => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		await this.program.rpc.initProtocolData(
			protocolDataBump,
			{
				accounts:{
					protocolDataAccount: protocolDataAccount,
					owner: this.wallet.publicKey,
					systemProgram: this.SYSTEM_PROGRAM_ID,
					rent: web3.SYSVAR_RENT_PUBKEY
				},
			}
		);
	}
	
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
				// signers:[this.wallet],
			}
		);
	}
	
	//////////////////////////////////
	// user callable functions
	DepositAssetPrintBond = async (asset_amount) => {
		// todo: calculate bond amount from pyth oracle.
		const bond_amount = 100;
	
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
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
	
		await this.program.rpc.depositAsset(userVaultBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
			accounts:{
			userAta: userATA,
			protocAta: protocolATA,
			userVault: userVault,
			user: this.wallet.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
			},
		})
	}
	
	RedeemBonds = async () => {
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
			mintAuth: this.wallet.publicKey,
			userAta: userATA,
			tokenProgram: TOKEN_PROGRAM_ID,
			systemProgram: this.SYSTEM_PROGRAM_ID,
			},
		});
	}
	
	// stake amount is in twst
	Stake = async(amount) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
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
		});
	}
	
	// unstake amount is stwst
	Unstake = async (amount) => {
	
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
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
			tokenAuthority: this.wallet.publicKey,
			},
		});
	}
	
	Rebase = async () => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.SYSTEM_PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.rebase({
			mintBump: mintBump,
			protocolDataBump: protocolDataBump,
		}, {
			accounts:{
			protocolData: protocolDataAccount,
			protocAta: protocolATA,
			mint: mintAccount,
			owner: this.wallet.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
			systemProgram: this.SYSTEM_PROGRAM_ID,
			}
		});
	}
	
	ChangeRebaseRate = async (new_rate) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
	
		await this.program.rpc.changeRebaseRate(protocolDataBump, 
			new anchor.BN(new_rate),
			{
			accounts:{
			protocolData: protocolDataAccount,
			owner: this.wallet.publicKey,
			},
		});
	}

}