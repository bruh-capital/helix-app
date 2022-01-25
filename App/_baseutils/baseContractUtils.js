import * as anchor from "@project-serum/anchor";

import * as web3 from "@solana/web3.js";
import {Token, TOKEN_PROGRAM_ID, getOrCreateAssociatedAccountInfo} from '@solana/spl-token';
import { SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
let ido_idl = require('@idl/ido.json');
let bond_idl = require('@idl/bond_market.json');
let helix_idl = require('@idl/twst.json');
let governance_idl = require('@idl/government_program.json');
let pyth_mapping = require("@baseutils/pythMapping.json");

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS

export class HelixNetwork {
	constructor(wallet){
		this.pyth_map = pyth_mapping;
		[...Object.entries(pyth_mapping)].forEach(([network, name_price]) =>{
			// for each name, price address in address map object
			[...Object.entries(name_price)].forEach(([asset_name, price_addr]) =>{
				this.pyth_map[network][asset_name] = new PublicKey(price_addr);
			});
		});

		this.connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL);
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions());

		this.helix_program = new anchor.Program(helix_idl, helix_idl.metadata.address, this.provider);
		this.ido_program = new anchor.Program(ido_idl, ido_idl.metadata.address, this.provider);
		this.bond_program = new anchor.Program(bond_idl, bond_idl.metadata.address, this.provider);
		this.governance_program = new anchor.Program(governance_idl, governance_idl.metadata.address, this.provider);

		this.multisigSigner = new PublicKey(process.env.NEXT_PUBLIC_MULTISIG_SIGNER_PUBKEY);
		this.treasuryWallet = new PublicKey(process.env.NEXT_PUBLIC_TREASURY_PUBKEY);
		this.spl_program_id = new PublicKey(process.env.NEXT_PUBLIC_SPL_ATA_PROGRAM_ID);

		this.wallet = wallet;
		this.token_program = Token;
		this.InitConsts();
	}

	InitConsts = async () => {
		// on mainnet
		// this.usdc_mint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

		// on devnet
		this.usdc_mint = new PublicKey("yxdMpffjwBqPnokGfZY2AaTJDzth3umWcqiKFn9fGJz");

		//////////////////////////////////////////////////////////////////////////////////////////////
		/// helix accounts
		const [helixMintAddress, helixMintBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("helixmintaccount")
			],
			this.helix_program.programId
		);
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"), 
				this.wallet.publicKey.toBuffer()
			],
			this.helix_program.programId
		);
		const [userHelixAta, userHelixAtaBump] = await PublicKey.findProgramAddress(
			[
				this.wallet.publicKey.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				helixMintAddress.toBuffer(),
			],
			this.spl_program_id
		);
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.helix_program.programId
		);
		
		const [protocolHelixAta,protocolHelixAtaBump] = await PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				helixMintAddress.toBuffer(),
			],
			this.spl_program_id
		);

		const [protocolATAOwner, protocolATAOwnerBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(), 
			  	TOKEN_PROGRAM_ID.toBuffer(), 
			  	helixMintAddress.toBuffer()
			],
			this.helix_program.programId
		  );


		//////////////////////////////////////////////////////////////////////////////////////////////
		/// bond accounts

		const [bondAccount, bondAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("bondaccount"),
			  this.wallet.publicKey.toBuffer()
			],
			this.bond_program.programId
		);

		const [bondMarketHelix, bondMarketHelixBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("bondmarket"),
			  helixMintAddress.toBuffer(),
			],
			this.bond_program.programId
		);

		const [bondMarketUSDC, bondMarketUSDCBump] = await anchor.web3.PublicKey.findProgramAddress(
		[
			Buffer.from("bondmarket"),
			this.usdc_mint.toBuffer(),
		],
		this.bond_program.programId
		);
	
		const [bondMarketSOL, bondMarketSOLBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("bondmarket"),
				SystemProgram.programId.toBuffer(),
			],
			this.bond_program.programId
		);
		
		const [bondSigner, bondSignerBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("bondprogram")
			],
			this.bond_program.programId
		  );
		
		//////////////////////////////////////////////////////////////////////////////////////////////
		/// ido accounts

		const [idoUSDCAta, idoUSDCAtaBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("helixusdc"),
			],
			this.ido_program.programId
		);

		const [idoAccount, idoAcocuntBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("idoaccount"),
			  this.wallet.publicKey.toBuffer()
			],
			this.ido_program.programId
		);
		
		// alphabetical
		this.bondAccount = bondAccount;
		this.bondAccountBump = bondAccountBump;
		
		this.bondMarketHelix = bondMarketHelix;
		this.bondMarketHelixBump = bondMarketHelixBump;
		
		this.bondMarketSOL = bondMarketSOL;
		this.bondMarketSOLBump = bondMarketSOLBump;

		this.bondMarketUSDC = bondMarketUSDC;
		this.bondMarketUSDCBump = bondMarketUSDCBump;

		this.bondSigner = bondSigner;
		this.bondSignerBump = bondSignerBump;

		this.idoAccount = idoAccount;
		this.idoAcocuntBump = idoAcocuntBump;

		this.idoUSDCAta = idoUSDCAta;
		this.idoUSDCAtaBump = idoUSDCAtaBump;
		
		this.helixMintAddress = helixMintAddress;
		this.helixMintBump = helixMintBump;

		this.userHelixAta = userHelixAta;
		this.userHelixAtaBump = userHelixAtaBump;

		this.userVault = userVault;
		this.userVaultBump = userVaultBump;

		this.protocolHelixAuth = protocolATAOwner;
		
		this.protocolDataAccount = protocolDataAccount;
		this.protocolDataBump = protocolDataBump;

		this.protocolHelixAta = protocolHelixAta;
		this.protocolHelixAtaBump = protocolHelixAtaBump;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS

	//////////////////////////////////////////////////////////////////////////////////////////////
	/// bond market

	InitBondAccount = async() => {
		await this.bond_program.rpc.initBondAccount({
			bondAccountBump: this.bondAccountBump,
			bondAccountSpace: new anchor.BN(1208) // account can hold 10 bonds, each with a maturity of 4 weeks
			},{
			accounts:{
				bondAccount: this.bondAccount,
				payer: this.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			// signers: [this.wallet],
			});
	}

	SolBond = async (bond_price, maturity, connection) => {
		console.log(bond_price);
		const pyth_sol_price_address = this.pyth_map[connection].SOL; // sol pubkey address for that connection
		
		await this.bond_program.rpc.depositAssetPrintBondSol(
			new anchor.BN(bond_price),
			new anchor.BN(maturity),
			{
				accounts:{
				pythOraclePrice: pyth_sol_price_address,
				userWallet: this.wallet.publicKey,
				treasuryWallet: this.multisigSigner,
				bondMarket: this.bondMarketSOL,
				bondAccount: this.bondAccount,
				systemProgram: SystemProgram.programId,
				},
				// signers: [this.wallet]
			}
		);
		
	}

	/// take asset mint as input
	SPLBond = async (bond_price, bond_maturity, mintAddress, asset, connection) => {	
		let tokenMintAddress = new PublicKey(mintAddress);

		const userAta = (await PublicKey.findProgramAddress(
			[
				this.wallet.publicKey.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				tokenMintAddress.toBuffer(),
			],
			this.spl_program_id
		))[0];

		const protocolSplAta = (await PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				tokenMintAddress.toBuffer(),
			],
			this.spl_program_id
		))[0];

		const [bondMarketSpl, bondMarketSplBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("bondmarket"),
			  tokenMintAddress.toBuffer(),
			],
			this.bond_program.programId
		);

		const pyth_spl_price_address = this.pyth_map[connection][asset]; // sol pubkey address for that connection

		await this.bond_program.rpc.depositAssetPrintBondSpl(
			new anchor.BN(bond_price),
			new anchor.BN(bond_maturity),
			{
				accounts:{
				pythOraclePrice: pyth_spl_price_address,
				user: this.wallet.publicKey,
				userAta: userAta,
				protocAta: protocolSplAta,
				bondAccount: this.bondAccount,
				mint: tokenMintAddress,
				bondMarket: bondMarketSpl,
				tokenProgram: TOKEN_PROGRAM_ID,
				},
				// signers: [userKP]
			}
		);
	}
	
	RedeemBonds = async () => {
		await this.bond_program.rpc.redeemBonds({
			mintBump: this.helixMintBump,
			signerBump: this.bondSignerBump
		},{
			accounts:{
				signerAccount: this.bondSigner,
				mint: this.helixMintAddress,
				collectionAccount: this.userHelixAta,
				bondAccount: this.bondAccount,
				twstProgram: this.helix_program.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			},
		});
	}

	CollectCoupon = async () => {
		await this.bond_program.rpc.collectCoupon({
			mintBump: this.helixMintBump,
			signerBump: this.bondSignerBump
		  },{
			accounts:{
				signerAccount: this.bondSigner,
				collectionAccount: this.userHelixAta,
				mint: this.helixMintAddress,
				bondAccount: this.bondAccount,
				twstProgram: this.helix_program.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			}
		  });
	}

	FetchBondMarket = async(mint) => {
		let [bond_market_address,] = await PublicKey.findProgramAddress(
			[
				Buffer.from("bondmarket"), 
				new PublicKey(mint).toBuffer()
			],
			this.bond_program.programId
		);

		return await this.bond_program.account.bondMarket.fetch(bond_market_address);
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	/// twst

	InitializeUserVault = async () => {
		await this.helix_program.rpc.initUserVault(
			this.userVaultBump,
			{
				accounts:{
					userAccount: this.userVault,
					payer: this.wallet.publicKey,
					user: this.wallet.publicKey,
					systemProgram: SystemProgram.programId,
				},
			// signers:[this.wallet.Keypair],
		});
	}
	
	CreateUserATA = async () => {
		let ata = await Token.getAssociatedTokenAddress(
			this.spl_program_id, // always ASSOCIATED_TOKEN_PROGRAM_ID
			TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
			this.helixMintAddress, // mint
			this.wallet.publicKey // owner
		);

		try{
			await this.connection.getParsedAccountInfo(
				ata
			);
		}catch(e){
			let tx = new anchor.web3.Transaction().add(
				Token.createAssociatedTokenAccountInstruction(
					this.spl_program_id, // always ASSOCIATED_TOKEN_PROGRAM_ID
					TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
					this.helixMintAddress, // mint
					ata, // ata
					this.wallet.publicKey, // owner of token account
					this.wallet.publicKey // fee payer
				)
			);

			tx.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
			tx.feePayer = this.wallet.publicKey;
			let signed_tx = await this.wallet.signTransaction(tx);
			await this.connection.sendRawTransaction(signed_tx.serialize());
		};
		// console.log("created token account");
	}

	// stake amount is in twst
	Stake = async(amount) => {
		await this.helix_program.rpc.stake({
			userVault: this.userVaultBump,
			userAta: this.userHelixAtaBump,
			protocolData: this.protocolDataBump,
			mintBump: this.helixMintBump,
			protocolAta: this.protocolHelixAtaBump,
		}, new anchor.BN(amount), {
		accounts:{
			userAta: this.userHelixAta,
			protocAta: this.protocolHelixAta,
			mint: this.helixMintAddress,
			userVault: this.userVault,
			protocolData: this.protocolDataAccount,
			user: this.wallet.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
		},
		// signers:[userKP],
		})
	}
	
	// unstake amount is stwst
	Unstake = async (amount) => {
		await this.helix_program.rpc.unstake({
		vaultBump: this.userVaultBump,
		protocolDataBump: this.protocolDataBump,
		mintBump: this.helixMintBump,
		protocolAtaBump: this.protocolHelixAtaBump,
		}, new anchor.BN(amount), {
		accounts:{
			user: this.wallet.publicKey,
			userAta: this.userHelixAta,
			userVault: this.userVault,
			protocolData: this.protocolDataAccount,
			protocAta: this.protocolHelixAta,
			protocAuth: this.protocolHelixAuth,
			mint: this.helixMintAddress,
			tokenProgram: TOKEN_PROGRAM_ID,
		},
		// signers:[userKP],
		})
	}

	MintAndCloseIDO = async() => {
		await this.helix_program.rpc.mintAndCloseIdo({
			idoAccountBump: this.idoAccountBump,
			mintBump: this.helixMintBump,
		  },
			{
			accounts:{
			  idoAccount: this.idoAccount,
			  user: this.wallet.publicKey,
			  mint: this.helixMintAddress,
			  userHelixAta: this.userHelixAta,
			  tokenProgram: TOKEN_PROGRAM_ID,
			  idoProgram: this.ido_program.programId,
			},
			// signers:[userKP],
		  });
	}

	ChangeLockup = async(duration) => {
		await program.rpc.changeLockup(
			this.userVaultBump,
			new anchor.BN(duration), {
			accounts:{
				userVault: this.userVault,
				user: this.wallet.publicKey,
			},
		// signers:[userKP],
		})
	}

	FetchUserVault = async() =>{
		console.log("FetchUserVault", this.userVault.toString());
		return await this.helix_program.account.userVault.fetch(this.userVault);
	}

	FetchProtocolData = async() =>{
		console.log("FetchProtocolData", this.protocolDataAccount.toString());
		return await this.helix_program.account.protocolDataAccount.fetch(this.protocolDataAccount);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	/// IDO

	// defaults to accepting usdc. can change in future
	IDODeposit = async(amount)  => {
		const userAta = (await PublicKey.findProgramAddress(
			[
				this.wallet.publicKey.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				this.usdc_mint.toBuffer(),
			],
			this.spl_program_id
		))[0];

		await program.rpc.idoDeposit({
			vaultBump: this.idoAcocuntBump,
			protocolBump: this.idoUSDCAtaBump,
		  },new anchor.BN(amount),{
			accounts:{
			  user: this.wallet.publicKey,
			  userAta: userAta,
			  idoUSDCAta: this.idoUSDCAta,
			  usdcMint: this.usdc_mint,
			  idoAccount: this.idoAccount,
			  systemProgram: SystemProgram.programId,
			  tokenProgram: TOKEN_PROGRAM_ID,
			  rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			// signers: [userKP],
		  });
	}

	IDOWithdraw = async(amount)  => {
		const userAta = (await PublicKey.findProgramAddress(
			[
				this.wallet.publicKey.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				this.usdc_mint.toBuffer(),
			],
			this.spl_program_id
		))[0];

		await this.ido_program.rpc.idoWithdraw({
			vaultBump: this.idoAccountBump,
			protocolBump: this.idoUSDCAtaBump,
			},new anchor.BN(amount),{
			accounts:{
				user: this.wallet.publicKey,
				userAta: userAta,
				idoUSDCAta: this.idoUSDCAta,
				usdcMint: this.helixMintAddress,
				idoAccount: this.idoAccount,
				tokenProgram: TOKEN_PROGRAM_ID,
			},
			// signers: [userKP],
		});
	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	/// Governance

	// create proposal
	CreateProposal = async(government_address, title, description, expiration_weeks, pid, accs, data) => {
		let proposalKp = anchor.web3.Keypair.generate();
		await this.governance_program.rpc.createProposal(title, description, new anchor.BN(expiration_weeks), pid ? pid : null, accs ? accs : null, data ? data : null, {
			accounts:{
			  proposal: proposalKp.publicKey,
			  payer: this.wallet.publicKey,
			  government: new PublicKey(government_address),
			  systemProgram: SystemProgram.programId,
			},
			signers:[proposalKp],
		});
	}

	// cast vote
	CastVote = async(proposal, choice) =>{
		await this.governance_program.rpc.castVote(
			choice,
			{
				accounts:{
					proposal: new PublicKey(proposal),
					user: this.wallet.publicKey,
					userVault: this.userVault,
					protocolData: this.protocolDataAccount,
				}
			}
		)
	}

	// fetch proposals
	FetchProposals = async(government) =>{
		return await this.governance_program.account.government.fetch(new PublicKey(government));
	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	GetTokenAccountBalance = async(mint) => {
		let ata = await Token.getAssociatedTokenAddress(
			this.spl_program_id, // always ASSOCIATED_TOKEN_PROGRAM_ID
			TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
			new PublicKey(mint), // mint
			this.wallet.publicKey // owner
		);

		let val = await this.connection.getTokenAccountBalance(ata);
		return val.value.uiAmount;
	}

	GetSolBalance = async() =>{
		return await this.connection.getBalance(this.wallet.publicKey)/anchor.web3.LAMPORTS_PER_SOL;;
	}
}