import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import { SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import * as ido_idl from '@idl/ido.json';
import * as bond_idl from '@idl/bond_market.json';
import * as helix_idl from '@idl/twst.json';

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS

export class HelixNetwork {
	constructor(wallet){
		this.connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL);
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions());

		this.helix_program = new anchor.Program(helix_idl, helix_idl.metadata.address, this.provider);
		this.ido_program = new anchor.Program(ido_idl, ido_idl.metadata.address, this.provider);
		this.bond_program = new anchor.Program(bond_idl, bond_idl.metadata.address, this.provider);

		this.multisig_signer = new PublicKey(process.env.NEXT_PUBLIC_MULTISIG_SIGNER_PUBKEY);
		this.treasuryWallet = new PublicKey(process.env.NEXT_PUBLIC_TREASURY_PUBKEY);

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
			this.helix_program.programId
		);
		await this.program.rpc.initUserVault(userVaultBump,
			{
				accounts:{
				userAccount: userVault,
				payer: this.wallet.publicKey,
				user: this.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			signers:[this.wallet.Keypair],
		});
	}
	
	CreateUserATA = async () => {
		console.log("creating user ata");
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[Buffer.from("initmint"), SystemProgram.programId.toBuffer()],
			this.helix_program.programId
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
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
					systemProgram: SystemProgram.programId,
				},
				signers:[this.wallet.Keypair],
			}
		);
	}
	
	//////////////////////////////////
	// user callable functions
	DepositSolPrintBond = async (asset_amount) => {
		// console.log("deposit asset, print bond");
		// const url = clusterApiUrl("devnet");
		// // full list at:
		// // https://pyth.network/developers/accounts/?cluster=devnet#
		// const SolProductKey = 'J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix';
		// const connection = new Connection(url);
		// const publicKey = new PublicKey(SolProductKey);
		// const SolData = await connection.getAccountInfo(publicKey);
		// const SolPriceInfo = pythUtils.parsePriceData(SolData.data);
		// //gives sol in terms of usd
		// const SolPrice = SolPriceInfo.aggregate.price;

		// const bond_amount = SolPrice;

		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
		);
	
		try{
			await this.program.rpc.depositAsset(userVaultBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
				accounts:{
				userWallet: this.wallet.publicKey,
				treasuryWallet: this.treasuryWallet,
				userVault: userVault,
				systemProgram: SystemProgram.programId,
				},
				signers:[this.wallet.Keypair],
				}
			)
		}catch(e){
			console.log(e);
			console.log("likely insufficient funds");
		}
	}

	DepositAssetPrintBond = async (asset_amount) => {
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
		);
	
		try{
			await this.program.rpc.depositAsset(userVaultBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
				accounts:{
				userWallet: this.wallet.publicKey,
				treasuryWallet: this.treasuryWallet,
				userVault: userVault,
				systemProgram: SystemProgram.programId,
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
			[Buffer.from("initmint"), SystemProgram.programId.toBuffer()],
			this.helix_program.programId
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
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
			systemProgram: SystemProgram.programId,
			},
		});
	}
	
	// stake amount is in twst
	Stake = async(amount) => {
		console.log("staking");
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.helix_program.programId
		);
		const [protocolATA,] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.multisig_signer.toBuffer()],
			this.helix_program.programId
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
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
			this.helix_program.programId
		);
		const [protocolATA,] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.multisig_signer.toBuffer()],
			this.helix_program.programId
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[Buffer.from("uservault"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
		);
		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[Buffer.from("usertokenaccount"), this.wallet.publicKey.toBuffer()],
			this.helix_program.programId
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
			tokenAuthority: this.multisig_signer,
			},
		});
	}
}