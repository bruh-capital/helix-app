import * as anchor from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import * as splToken from '@project-serum/anchor';

export const PROGRAM_ID = new PublicKey(idl.metadata.address);

const program = new Program(idl, PROGRAM_ID, provider);
const programMultisigWallet = new PublicKey("2to8Y37AJAsCT7XFpSrvidTpSoF13L8pLM1pWoTgSprd");

export const InitializeMint = async (wallet) => {
	const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
		[Buffer.from("initmint"), PROGRAM_ID.toBuffer()],
		PROGRAM_ID
	);
		
	await program.rpc.initMint(mintBump, {
		accounts:{
		mint: mintAccount,
		payer: wallet.publicKey,
		systemProgram: PROGRAM_ID,
		tokenProgram: splToken.TOKEN_PROGRAM_ID,
		rent: web3.SYSVAR_RENT_PUBKEY,
		},
	});
}

export const CreateProtocolATA = async (wallet) => {
	const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
		[Buffer.from("initmint"), PROGRAM_ID.toBuffer()],
		PROGRAM_ID
	);
	const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
		PROGRAM_ID
	);
	await program.rpc.initUserAta(
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
				systemProgram: PROGRAM_ID,
			},
		}
	);
}

export const InitializeProtocolData = async (wallet) => {
	const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
		[Buffer.from("protocoldataaccount")],
		PROGRAM_ID
	);
	await program.rpc.initProtocolData(
		protocolDataBump,
		{
			accounts:{
				protocolDataAccount: protocolDataAccount,
				owner: wallet.publicKey,
				systemProgram: PROGRAM_ID,
				rent: web3.SYSVAR_RENT_PUBKEY
			},
		}
	);
}

export const InitializeUserVault = async (wallet) => {
	const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
		[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	program.rpc.initUserVault(userVaultBump,
		{
			accounts:{
			userAccount: userVault,
			payer: wallet.publicKey,
			user: wallet.publicKey,
			systemProgram: PROGRAM_ID,
		},
	});
}

export const CreateUserATA = async (wallet) => {
	const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
		[Buffer.from("initmint"), PROGRAM_ID.toBuffer()],
		PROGRAM_ID
	);
	const [userATA, userATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	await program.rpc.initUserAta({
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
				systemProgram: PROGRAM_ID,
			},
		}
	);
}

export const DepositAssetPrintBond = async (wallet, asset_amount) => {
	// todo: calculate bond amount from pyth oracle.
	const bond_amount = 100;


	const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
		PROGRAM_ID
	);
	const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
		[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	const [userATA, userATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);

	await program.rpc.depositAsset(userBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
		accounts:{
		userAta: userATA,
		protocAta: protocolATA,
		userVault: userVault,
		user: wallet.publicKey,
		tokenProgram: splToken.TOKEN_PROGRAM_ID,
		},
	})
}

export const RedeemBonts = async (wallet) => {
	const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
		[Buffer.from("initmint"), PROGRAM_ID.toBuffer()],
		PROGRAM_ID
	);
	const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
		[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	const [userATA, userATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	await program.rpc.redeemBonds({
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
		systemProgram: PROGRAM_ID,
		},
	});
}

// stake amount is in twst
export const Stake = async(wallet, amount) => {
	const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
		[Buffer.from("protocoldataaccount")],
		PROGRAM_ID
	);
	const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
		PROGRAM_ID
	);
	const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
		[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	const [userATA, userATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);

	await program.rpc.stake({
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
export const Unstake = async (wallet, amount) => {

	const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
		[Buffer.from("protocoldataaccount")],
		PROGRAM_ID
	);
	const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
		PROGRAM_ID
	);
	const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
		[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	const [userATA, userATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
		PROGRAM_ID
	);
	await program.rpc.unstake({
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

export const Rebase = async (wallet) => {
	const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
		[Buffer.from("initmint"), PROGRAM_ID.toBuffer()],
		PROGRAM_ID
	);
	const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
		[Buffer.from("protocoldataaccount")],
		PROGRAM_ID
	);
	const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
		[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
		PROGRAM_ID
	);
	await program.rpc.rebase({
		mintBump: mintBump,
		protocolDataBump: protocolDataBump,
	}, {
		accounts:{
		protocolData: protocolDataAccount,
		protocAta: protocolATA,
		mint: mintAccount,
		owner: wallet.publicKey,
		tokenProgram: splToken.TOKEN_PROGRAM_ID,
		systemProgram: PROGRAM_ID,
		}
	});
}

export const ChangeRebaseRate = async (wallet, new_rate) => {
	const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
		[Buffer.from("protocoldataaccount")],
		PROGRAM_ID
	);

	await program.rpc.changeRebaseRate(protocolDataBump, 
		new anchor.BN(new_rate),
		{
		accounts:{
		protocolData: protocolDataAccount,
		owner: wallet.publicKey,
		},
	});
}