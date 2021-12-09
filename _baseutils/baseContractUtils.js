import * as anchor from "@project-serum/anchor";

export const PROGRAM_ID = new PublicKey(idl.metadata.address);

const program = new Program(idl, programID, provider);

const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
[Buffer.from("initmint"), programID.toBuffer()],
programID
);

const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
[Buffer.from("protocoldataaccount")],
programID
);

const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
[Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
programID
);

const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
[Buffer.from("uservault"), wallet.publicKey.toBuffer()],
programID
);

const [userATA, userATABump] = await PublicKey.findProgramAddress(
[Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
programID
);

export const InitializeMint = async () => {
	await program.rpc.initMint(mintBump, {
		accounts:{
		mint: mintAccount,
		payer: wallet.publicKey,
		systemProgram: programID,
		tokenProgram: splToken.TOKEN_PROGRAM_ID,
		rent: web3.SYSVAR_RENT_PUBKEY,
		},
	});
}

export const CreateProtocolATA = async () => {
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
				systemProgram: programID,
			},
		}
	);
}

export const InitializeProtocolData = async () => {
	await program.rpc.initProtocolData(
		protocolDataBump,
		{
			accounts:{
				protocolDataAccount: protocolDataAccount,
				owner: wallet.publicKey,
				systemProgram: programID,
				rent: web3.SYSVAR_RENT_PUBKEY
			},
		}
	);
}

export const InitializeUserVault = async () => {
	program.rpc.initUserVault(userVaultBump,
		{
			accounts:{
			userAccount: userVault,
			payer: wallet.publicKey,
			user: wallet.publicKey,
			systemProgram: programID,
		},
	});
}

export const CreateUserATA = async () => {
	await program.rpc.initUserAta({
			userBump: userATABump,
			mintBump: mintBump,
		},
		{
			accounts:{
				userAta: userATAAccount,
				payer: wallet.publicKey,
				user: wallet.publicKey,
				rent: web3.SYSVAR_RENT_PUBKEY,
				mint: mintAccount,
				tokenProgram: splToken.TOKEN_PROGRAM_ID,
				systemProgram: programID,
			},
		}
	);
}

export const DepositAssetPrintBond = async (asset_amount) => {
	// todo: calculate bond amount from pyth oracle.
	const bond_amount = 100;
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

export const RedeemBonts = async () => {
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
		systemProgram: programID,
		},
	});
}

// stake amount is in twst
export const Stake = async(amount) => {
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
export const Unstake = async () => {
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

export const Rebase = async () => {
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
		systemProgram: programID,
		}
	});
}

export const ChangeRebaseRate = async (new_rate) => {
	await program.rpc.changeRebaseRate(protocolDataBump, 
		new anchor.BN(new_rate),
		{
		accounts:{
		protocolData: protocolDataAccount,
		owner: wallet.publicKey,
		},
	});
}