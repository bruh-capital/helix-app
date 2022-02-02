import * as anchor from "@project-serum/anchor";

import * as web3 from "@solana/web3.js";
import {Token, TOKEN_PROGRAM_ID, getOrCreateAssociatedAccountInfo} from '@solana/spl-token';
import { SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
let ido_idl = require('@idl/ido.json');
let bond_idl = require('@idl/bond_market.json');
let helix_idl = require('@idl/twst.json');
let multisig_idl = require("@idl/serum_multisig.json");
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
		this.multisig_program = new anchor.Program(multisig_idl, multisig_idl.metadata.address, this.provider);

		this.multisigSigner = new PublicKey(process.env.NEXT_PUBLIC_MULTISIG_SIGNER_PUBKEY);
		this.multisig = new PublicKey("4GPNDn6Fm6HmBE1B91wS8SuoZquVNGWLr9Hvh6kdCD65");
		this.treasuryWallet = new PublicKey(process.env.NEXT_PUBLIC_TREASURY_PUBKEY);
		this.spl_program_id = new PublicKey(process.env.NEXT_PUBLIC_SPL_ATA_PROGRAM_ID);

		this.indianeros = new PublicKey("75ev4N83x1nDGhDEgkHiedha8XbPxf33HTJSJj28eze7");
		this.millionz = new PublicKey("E5EP2qkdXmPwXA9ANzoG69Gmj86Jdqepjw2XrQDGj9sM");
		this.mazer = new PublicKey("6P3MTfMqidubdgQEaoxPSZJpjuzz7MopVH76fnJK9JM1");

		[...this.helix_program._idl.instructions].forEach((instruction)=>{
			console.log(instruction.name);
			console.log(instruction.args);
		});
		this.txsize = 1000;

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

		const [protocolATAOwner, protocolATAOwnerBump] = await PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(), 
			  	TOKEN_PROGRAM_ID.toBuffer(), 
			  	helixMintAddress.toBuffer()
			],
			this.helix_program.programId
		  );


		//////////////////////////////////////////////////////////////////////////////////////////////
		/// bond accounts


		const [bondMarketHelix, bondMarketHelixBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("bondmarket"),
			  helixMintAddress.toBuffer(),
			],
			this.bond_program.programId
		);

		const [bondMarketUSDC, bondMarketUSDCBump] = await PublicKey.findProgramAddress(
		[
			Buffer.from("bondmarket"),
			this.usdc_mint.toBuffer(),
		],
		this.bond_program.programId
		);
	
		const [bondMarketSOL, bondMarketSOLBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("bondmarket"),
				SystemProgram.programId.toBuffer(),
			],
			this.bond_program.programId
		);
		
		const [bondSigner, bondSignerBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("bondprogram")
			],
			this.bond_program.programId
		  );
		
		//////////////////////////////////////////////////////////////////////////////////////////////
		/// ido accounts

		const [idoUSDCAta, idoUSDCAtaBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("helixusdc"),
			],
			this.ido_program.programId
		);

		const [idoAccount, idoAcocuntBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("idoaccount"),
			  this.wallet.publicKey.toBuffer()
			],
			this.ido_program.programId
		);
		
		// alphabetical
		
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

	//todo
	CreateBondMarket = async(mint) =>{

		const [bondMarketAddress, bondMarketAddressBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("bondmarket"),
			  new PublicKey(mint).toBuffer(),
			],
			bond_program.programId
		);

		const createBondMarket = anchor.web3.Keypair.generate();

		const createBondMarketAccounts = [
			{
			pubkey: bondMarketAddress,
			isSigner: false,
			isWritable: true,
			},{
			pubkey: this.helixMintAddress,
			isSigner: false,
			isWritable: false
			},{
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: true
			},{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
			}];

		const data = this.bond_program.coder.instruction.encode("init_bond_market", {
			vars: {
				marketBump: bondMarketAddressBump,
				marketSpace: new anchor.BN(184), // 24 for variables + 160 for a vec of 20 pubkeys
			},
			// default [0%, 1%, 1%, 2%, 3%]
			couponRates: [new anchor.BN(0), new anchor.BN(10), new anchor.BN(10), new anchor.BN(20), new anchor.BN(30)],
			interestRate: new anchor.BN(300),
		});

		await this.multisig_program.rpc.createTransaction(
			this.bond_program.programId,
			createBondMarketAccounts, 
			data, {
			accounts: {
				multisig: this.multisig,
				transaction: createBondMarket.publicKey,
				// i am indian eros :3
				proposer: this.wallet.publicKey,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
				// creates transaction account clientside
				await this.multisig_program.account.transaction.createInstruction(
					createBondMarket,
					this.txSize
				),
			],
			signers: [createBondMarket],
		});

		await this.multisig_program.rpc.executeTransaction({
			accounts: {
				multisig: this.multisig,
				multisigSigner: this.multisigSigner,
				transaction: createBondMarket.publicKey,
			},
			remainingAccounts:
			createBondMarketAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.bond_program.programId}),
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

	FetchUserVault = async() =>{
		
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

	CreateGovernment = async(governed_program)=>{
		// only one government per program
		// program can be another government or one of helix's programs or any program really
		const [govAddress, govAddressBump] = await PublicKey.findProgramAddress(
			[
				new PublicKey(governed_program).toBuffer()
			],
		  	this.governance_program.programId
		  );

		await this.governance_program.rpc.createGovernment(
			{
				govProgId: new PublicKey(governed_program),
				govBump: govAddressBump
			},
			new PublicKey(governed_program),
			{
				accounts:{
					government: govAddress,
					payer: this.wallet.publicKey,
					protocolData: this.protocolDataAccount,
					systemProgram: SystemProgram.programId,
				},
			// signers:[government_kp, funderKP],
			}
		);
	}

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
	FetchProposals = async(governed_program) =>{
		const [govId, govBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
				new PublicKey(governed_program).toBuffer(),
			],
			this.governance_program.programId,
		);
		return await this.governance_program.account.government.fetch(new PublicKey(govId));
	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	// multisig functions

	// this is here but we shouldnt need to invoke this ever.
	// unless something gigantic breaks in helix and we need to factory reset everything
	CreateHelixMint = async() =>{
		const mintTransaction = anchor.web3.Keypair.generate();
		const mintAccounts = [
			{
			pubkey: this.helixMintAddress,
			isSigner: false,
			isWritable: true
			},{
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: true
			},{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
			},{
			pubkey: TOKEN_PROGRAM_ID,
			isSigner: false,
			isWritable: false
			},{
			pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
			isSigner: false,
			isWritable: false
			}
		];
		
		const init_mint_data = this.helix_program.coder.instruction.encode("init_mint", {
			mintBump: mintBump,
		});
		await this.multisig_program.rpc.createTransaction(
			this.helix_program.programId,
			mintAccounts, 
			init_mint_data, {
			accounts: {
				multisig: this.multisig,
				transaction: mintTransaction.publicKey,
				proposer: this.wallet.publicKey,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
			// creates transaction account clientside
				await this.multisig_program.account.transaction.createInstruction(
					mintTransaction,
					txSize
				),
			],
			signers: [mintTransaction],
		});

		await this.multisig_program.rpc.executeTransaction({
			accounts: {
			multisig: this.multisig,
			multisigSigner: this.multisigSigner,
			transaction: mintTransaction.publicKey,
			},
			// passes in the accounts needed during this execution.
			// confusing, i know. but instruction creation (&ix) needs a data array
			// then call needs the same array.
			remainingAccounts:
			mintAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.helix_program.programId}),
		});
	}

	GovernmentOwnedTokenAccount = async(mint, government) =>{
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(), 
				TOKEN_PROGRAM_ID.toBuffer(), 
				new PublicKey(mint).toBuffer()
			],
			this.spl_program_id
		);

		const [govId, govBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
				new PublicKey(government).toBuffer(),
			],
			this.governance_program.programId,
		)
		
		const [protocolATAOwner, protocolATAOwnerBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("governmentauthority"), 
				govId.toBuffer()
			],
			this.governance_program.programId
		);

		const createAtaGovTransaction = anchor.web3.Keypair.generate();

		const createAtaGov = Token.createAssociatedTokenAccountInstruction(
		  this.spl_program_id,
		  TOKEN_PROGRAM_ID,
		  new PublicKey(mint),
		  protocolATA,
		  this.multisigSigner, // payer address for pda
		  this.multisigSigner
		);
	  
		const protocolAtaSPLAccounts = createAtaGov.keys;
	  
		const create_ata_data = createAtaGov.data;
	  
		await this.multisig_program.rpc.createTransaction(
			createAtaGov.programId,
			protocolAtaSPLAccounts, 
			create_ata_data, {
			accounts: {
			multisig: this.multisig,
			transaction: createAtaGovTransaction.publicKey,
			proposer: this.wallet.publicKey,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
			// creates transaction account clientside
			await program.account.transaction.createInstruction(
				createAtaGovTransaction,
				txSize
			),
			],
			signers: [createAtaGovTransaction],
		});
	  
		await this.multisig_program.rpc.executeTransaction({
			accounts: {
			multisig: this.multisig,
			multisigSigner: this.multisigSigner,
			transaction: createAtaGovTransaction.publicKey,
			},
			// passes in the accounts needed during this execution.
			// confusing, i know. but instruction creation (&ix) needs a data array
			// then call needs the same array.
			remainingAccounts:
			protocolAtaSPLAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.spl_program_id}),
		});

		const ataOwnershipTransaction = anchor.web3.Keypair.generate();
	  
		const ataOwnershipInstruction = Token.createSetAuthorityInstruction(
		  TOKEN_PROGRAM_ID,
		  protocolATA,
		  protocolATAOwner,
		  "AccountOwner",
		  this.multisigSigner,
		  []
		);
	  
	  
		const transferOwnershipAccounts = ataOwnershipInstruction.keys;
	  
		const ownership_transfer_data = ataOwnershipInstruction.data;
	  
		await this.multisig_program.rpc.createTransaction(
			ataOwnershipInstruction.programId,
			transferOwnershipAccounts, 
			ownership_transfer_data, {
			accounts: {
				multisig: this.multisig,
				transaction: ataOwnershipTransaction.publicKey,
				proposer: this.wallet.publicKey,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
			// creates transaction account clientside
			await program.account.transaction.createInstruction(
				ataOwnershipTransaction,
				txSize
			),
			],
			signers: [ataOwnershipTransaction],
		});
	  
		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
		    accounts: {
		      multisig: this.multisig,
		      multisigSigner: this.multisigSigner,
		      transaction: ataOwnershipTransaction.publicKey,
		    },
		    // passes in the accounts needed during this execution.
		    // confusing, i know. but instruction creation (&ix) needs a data array
		    // then call needs the same array.
		    remainingAccounts:
		    transferOwnershipAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: TOKEN_PROGRAM_ID}),
		});
	}

	MultisigOwnedTokenAccount = async(mint) =>{
		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[
				this.multisigSigner.toBuffer(), 
				TOKEN_PROGRAM_ID.toBuffer(), 
				new PublicKey(mint).toBuffer()
			],
			this.spl_program_id
		);


		const multisigAtaTransaction = anchor.web3.Keypair.generate();

		const createAtaMultisig = Token.createAssociatedTokenAccountInstruction(
		  this.spl_program_id,
		  TOKEN_PROGRAM_ID,
		  new PublicKey(mint),
		  protocolATA,
		  this.multisigSigner,
		  this.multisigSigner,
		);
	  
		const protocolAtaAccounts = createAtaMultisig.keys;
	  
		// callee function name and params
		const create_ata_data = createAtaMultisig.data;
	  
		await this.multisig_program.rpc.createTransaction(
		  createAtaMultisig.programId,
		  protocolAtaAccounts, 
		  create_ata_data, {
		  accounts: {
			multisig: this.multisig,
			transaction: multisigAtaTransaction.publicKey,
			proposer: this.wallet.publicKey,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
		  },
		  instructions: [
			// creates transaction account clientside
			await program.account.transaction.createInstruction(
			  multisigAtaTransaction,
			  txSize
			),
		  ],
		  signers: [multisigAtaTransaction],
		});
	  
		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
			accounts: {
				multisig: this.multisig,
				multisigSigner: this.multisigSigner,
				transaction: multisigAtaTransaction.publicKey,
			},
			// passes in the accounts needed during this execution.
			// confusing, i know. but instruction creation (&ix) needs a data array
			// then call needs the same array.
			remainingAccounts:
			protocolAtaAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.spl_program_id}),
		});
	  
	}

	// mint to helix account
	MintToAccount = async(mintToAccount, amount) =>{
		
		const [mintAccount, mintAccountBump] = await PublicKey.findProgramAddress(
			[
				new PublicKey(mintToAccount).toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				helixMintAddress.toBuffer(),
			],
			this.spl_program_id
		)

		const mintToAccountTransaction = anchor.web3.Keypair.generate();

		const mintToAccountAccounts = [
		  {
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: false,
		  },{
			pubkey: mintAccount, //user
			isSigner: false,
			isWritable: true
		  },{
			pubkey: this.helixMintAddress,
			isSigner: false,
			isWritable: true
		  },{
			pubkey: TOKEN_PROGRAM_ID,
			isSigner: false,
			isWritable: false
		  },{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
		  },
		];
	  
		// callee function name and params
		const data = this.helix_program.coder.instruction.encode("mint_to_account", {
			mintBump: this.helixMintBump,
			amt: new anchor.BN(amount)
		  });
	  
		  await this.multisig_program.rpc.createTransaction(
			this.helix_program.programId,
			mintToAccountAccounts, 
			data, {
			accounts: {
			  multisig: this.multisig,
			  transaction: mintToAccountTransaction.publicKey,
			  proposer: this.wallet.publicKey,
			  rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
			  // creates transaction account clientside
			  await program.account.transaction.createInstruction(
				mintToAccountTransaction,
				txSize
			  ),
			],
			signers: [mintToAccountTransaction],
		  });
	  
		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
			accounts: {
			  multisig: this.multisig,
			  multisigSigner: this.multisigSigner,
			  transaction: mintToAccountTransaction.publicKey,
			},
			// passes in the accounts needed during this execution.
			// confusing, i know. but instruction creation (&ix) needs a data array
			// then call needs the same array.
			remainingAccounts:
			mintToAccountAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.helix_program.programId}),
		  });
	  
	}

	Rebase = async() =>{
		const rebaseTransaction = anchor.web3.Keypair.generate();

		const rebaseAccounts = [
			{
			pubkey: this.protocolDataAccount,
			isSigner: false,
			isWritable: true,
			},{
			pubkey: this.protocolHelixAta, //user
			isSigner: false,
			isWritable: true
			},{
			pubkey: this.helixMintAddress,
			isSigner: false,
			isWritable: true
			},{
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: true
			},{
			pubkey: TOKEN_PROGRAM_ID,
			isSigner: false,
			isWritable: false
			},{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
			},
		];

		// callee function name and params
		const data = this.helix_program.coder.instruction.encode("rebase", {
			bump:{
			protocolDataBump: this.protocolDataBump,
			mintBump: this.helixMintBump,
			protocolAtaBump: this.protocolHelixAtaBump,
			}
		});

		await this.multisig_program.rpc.createTransaction(
			this.helix_program.programId,
			rebaseAccounts, 
			data, {
			accounts: {
			multisig: this.multisig,
			transaction: rebaseTransaction.publicKey,
			proposer: this.wallet.publicKey,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			},
			instructions: [
			// creates transaction account clientside
			await program.account.transaction.createInstruction(
				rebaseTransaction,
				txSize
			),
			],
			signers: [rebaseTransaction],
		});

		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
			accounts: {
			multisig: this.multisig,
			multisigSigner,
			transaction: rebaseTransaction.publicKey,
			},
			// passes in the accounts needed during this execution.
			// confusing, i know. but instruction creation (&ix) needs a data array
			// then call needs the same array.
			remainingAccounts:
			rebaseAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.helix_program.programId}),
		});

	}

	ChangeRebaseRate = async() =>{
		const changeRebaseTransaction = anchor.web3.Keypair.generate();

		const changeRebaseAccounts = [
		  {
			pubkey: this.protocolDataAccount,
			isSigner: false,
			isWritable: true,
		  },{
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: true
		}];
	  
		// callee function name and params
		const data = this.helix_program.coder.instruction.encode("change_rebase_rate", {
		    bump:{
		      protocolBump: this.protocolDataBump,
		    }
		  });
	  
		  await this.multisig_program.rpc.createTransaction(
		    this.helix_program.programId,
		    changeRebaseAccounts, 
		    data, {
		    accounts: {
		      multisig: this.multisig,
		      transaction: changeRebaseTransaction.publicKey,
		      proposer: this.wallet.publicKey,
		      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
		    },
		    instructions: [
		      // creates transaction account clientside
		      await program.account.transaction.createInstruction(
		        changeRebaseTransaction,
		        txSize
		      ),
		    ],
		    signers: [changeRebaseTransaction],
		  });
	  
		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
		    accounts: {
		      multisig: this.multisig,
		      multisigSigner: this.multisigSigner,
		      transaction: changeRebaseTransaction.publicKey,
		    },
		    // passes in the accounts needed during this execution.
		    // confusing, i know. but instruction creation (&ix) needs a data array
		    // then call needs the same array.
		    remainingAccounts:
		    changeRebaseAccounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.helix_program.programId}),
		  });
	  
	}

	// we also shouldnt need to call this ever. but its possible
	CreateBondSigner = async() =>{
		const createBondSigner = anchor.web3.Keypair.generate();

		const [bondSigner, bondSignerBump] = await PublicKey.findProgramAddress(
			[
			  Buffer.from("bondprogram")
			],
			this.bond_program.programId
		  );

		const createBondSignerAccoounts = [
		  {
			pubkey: bondSigner,
			isSigner: false,
			isWritable: true,
		  },{
			pubkey: this.multisigSigner,
			isSigner: false,
			isWritable: true
		  },{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
		  }];
	  
		  const data = bond_program.coder.instruction.encode("create_signer", {
		    signerBump: bondSignerBump,
		  });
	  
		  await this.multisig_program.rpc.createTransaction(
		    bond_program.programId,
		    createBondSignerAccoounts, 
		    data, {
		    accounts: {
		      multisig: this.multisig,
		      transaction: createBondSigner.publicKey,
		      proposer: this.wallet.publicKey,
		      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
		    },
		    instructions: [
		      // creates transaction account clientside
		      await program.account.transaction.createInstruction(
		        createBondSigner,
		        txSize
		      ),
		    ],
		    signers: [createBondSigner],
		  });
	  
		// Now that we've reached the threshold, send the transactoin.
		await this.multisig_program.rpc.executeTransaction({
		    accounts: {
		      multisig: this.multisig,
		      multisigSigner: this.multisigSigner,
		      transaction: createBondSigner.publicKey,
		    },
		    // passes in the accounts needed during this execution.
		    // confusing, i know. but instruction creation (&ix) needs a data array
		    // then call needs the same array.
		    remainingAccounts:
		    createBondSignerAccoounts.map((meta) => meta.isSigner? {...meta, isSigner:false}:meta).concat({pubkey: this.bond_program.programId}),
		  });
	  
	}


	//////////////////////////////////////////////////////////////////////////////////////////////
	// general solana system functions
	GetTokenAccountBalance = async(mint) => {
		let ata = await Token.getAssociatedTokenAddress(
			this.spl_program_id, // always ASSOCIATED_TOKEN_PROGRAM_ID
			TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
			new PublicKey(mint), // mint
			this.multisigSigner // owner
		);

		let val = await this.connection.getTokenAccountBalance(ata);
		return val.value.uiAmount;
	}

	GetSolBalance = async() =>{
		return await this.connection.getBalance(this.multisigSigner)/anchor.web3.LAMPORTS_PER_SOL;;
	}
}