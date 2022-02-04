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