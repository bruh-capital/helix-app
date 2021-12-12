import * as anchor from "@project-serum/anchor";
import {PublicKey, Connection} from "@solana/web3.js";
import * as splToken from '@solana/spl-token';
import * as idl from '@idl/twst.json';

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS

export class HelixNetwork {
	constructor(wallet){
		this.PROGRAM_ID = new anchor.web3.PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
		this.connection = new Connection('http://localhost:8899');
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions()) 
		this.program = new anchor.Program(idl, this.PROGRAM_ID, this.provider);
		this.programMultisigWallet = new anchor.web3.PublicKey("75ev4N83x1nDGhDEgkHiedha8XbPxf33HTJSJj28eze7");
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS
	InitializeMint = async (wallet) => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
			
		await this.program.rpc.initMint(mintBump, {
			accounts:{
			mint: mintAccount,
			payer: wallet.publicKey,
			systemProgram: this.PROGRAM_ID,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			rent: web3.SYSVAR_RENT_PUBKEY,
			},
		});
	}
	
	CreateProtocolATA = async (wallet) => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.PROGRAM_ID.toBuffer()],
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
					payer: wallet.publicKey,
					user: wallet.publicKey,
					rent: web3.SYSVAR_RENT_PUBKEY,
					mint: mintAccount,
					tokenProgram: splToken.TOKEN_PROGRAM_ID,
					systemProgram: this.PROGRAM_ID,
				},
			}
		);
	}
	
	InitializeProtocolData = async (wallet) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		await this.program.rpc.initProtocolData(
			protocolDataBump,
			{
				accounts:{
					protocolDataAccount: protocolDataAccount,
					owner: wallet.publicKey,
					systemProgram: this.PROGRAM_ID,
					rent: web3.SYSVAR_RENT_PUBKEY
				},
			}
		);
	}
	
	InitializeUserVault = async (wallet) => {
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		this.program.rpc.initUserVault(userVaultBump,
			{
				accounts:{
				userAccount: userVault,
				payer: wallet.publicKey,
				user: wallet.publicKey,
				systemProgram: this.PROGRAM_ID,
			},
		});
	}
	
	CreateUserATA = async (wallet) => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.initUserAta({
				userBump: userATABump,
				mintBump: mintBump,
			},
			{
				accounts:{
					userAta: userATA,
					payer: wallet.publicKey,
					user: wallet.publicKey,
					rent: web3.SYSVAR_RENT_PUBKEY,
					mint: mintAccount,
					tokenProgram: splToken.TOKEN_PROGRAM_ID,
					systemProgram: this.PROGRAM_ID,
				},
			}
		);
	}
	
	DepositAssetPrintBond = async (wallet, asset_amount) => {
		// todo: calculate bond amount from pyth oracle.
		const bond_amount = 100;
	
	
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
	
		await this.program.rpc.depositAsset(userBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
			accounts:{
			userAta: userATA,
			protocAta: protocolATA,
			userVault: userVault,
			user: wallet.publicKey,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			},
		})
	}
	
	RedeemBonts = async (wallet) => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.PROGRAM_ID.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.redeemBonds({
			userVaultBump: userVaultBump,
			userAtaBump: userATABump,
			mintBump: mintBump,
		},{
			accounts:{
			user: wallet.publicKey,
			userData: userVault,
			mint: mintAccount,
			mintAuth: wallet.publicKey,
			userAta: userATA,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			systemProgram: this.PROGRAM_ID,
			},
		});
	}
	
	// stake amount is in twst
	Stake = async(wallet, amount) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
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
			user: wallet.publicKey,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			},
		});
	}
	
	// unstake amount is stwst
	Unstake = async (wallet, amount) => {
	
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.programMultisigWallet.toBuffer()],
			this.PROGRAM_ID
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
			this.PROGRAM_ID
		);
		await this.program.rpc.unstake({
			userVault: userVaultBump,
			userAta: userATABump,
			protocolData: protocolDataBump,
		}, new anchor.BN(amount),{
			accounts:{
			user: wallet.publicKey,
			userAta: userATA,
			userVault: userVault,
			protocolData: protocolDataAccount,
			protocAta: protocolATA,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			tokenAuthority: wallet.publicKey,
			},
		});
	}
	
	Rebase = async (wallet) => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), this.PROGRAM_ID.toBuffer()],
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
			owner: wallet.publicKey,
			tokenProgram: splToken.TOKEN_PROGRAM_ID,
			systemProgram: this.PROGRAM_ID,
			}
		});
	}
	
	ChangeRebaseRate = async (wallet, new_rate) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);
	
		await this.program.rpc.changeRebaseRate(protocolDataBump, 
			new anchor.BN(new_rate),
			{
			accounts:{
			protocolData: protocolDataAccount,
			owner: wallet.publicKey,
			},
		});
	}

}