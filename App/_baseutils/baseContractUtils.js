import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import { SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import * as ido_idl from '@idl/ido.json';
import * as bond_idl from '@idl/bond_market.json';
import * as helix_idl from '@idl/twst.json';
import * as pyth_mapping from "@baseutils/pythMapping.json";

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTS

export class HelixNetwork {
	constructor(wallet){

		this.pyth_map = (()=>{
			let ret_map = {};
			// for each network and address map object defined
			[...Object.entries(pyth_mapping)].forEach(([network, name_price]) =>{
				let name_price_map = {};
				console.log(network, name_price);
				// for each name, price address in address map object
				[...Object.entries(name_price)].forEach(([asset_name, price_addr]) =>{
					console.log(price_addr);
					name_price_map[asset_name] = new PublicKey(price_addr);
				});
				ret_map[network] = name_price_map;
			})
		})();

		this.connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL);
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions());

		this.helix_program = new anchor.Program(helix_idl, helix_idl.metadata.address, this.provider);
		this.ido_program = new anchor.Program(ido_idl, ido_idl.metadata.address, this.provider);
		this.bond_program = new anchor.Program(bond_idl, bond_idl.metadata.address, this.provider);

		this.multisigSigner = new PublicKey(process.env.NEXT_PUBLIC_MULTISIG_SIGNER_PUBKEY);
		this.treasuryWallet = new PublicKey(process.env.NEXT_PUBLIC_TREASURY_PUBKEY);
		this.spl_program_id = new PublicKey(process.env.NEXT_SPL_ATA_PROGRAM_ID);

		this.wallet = wallet;
		this.InitConsts();
	}

	InitConsts = async () => {
		// on mainnet
		this.usdc_mint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

		//////////////////////////////////////////////////////////////////////////////////////////////
		/// helix accounts
		const [helixMintAddress, helixMintBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("helixmint")
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
				this.TOKEN_PROGRAM_ID.toBuffer(),
				helixMintAddress.toBuffer(),
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
				this.TOKEN_PROGRAM_ID.toBuffer(),
				helixMintAddress.toBuffer(),
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
			  mintAccount.toBuffer(),
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

		const pyth_sol_price_address = this.pyth_map[connection.value].sol; // sol pubkey address for that connection
		
		await program.rpc.depositAssetPrintBondSol(
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
	SPLBond = async (bond_price, bond_maturity, asset, connection) => {	
		let tokenMintAddress;

		// map asset to address. MUST USE BREAKS BECAUSE JAVASCRIPT IS DUMB LIKE THAT
		switch(asset){
			case "usdc":
				tokenMintAddress = this.usdc_mint;
				break;
			default:
				break;
		};

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
			this.helix_program.programId
		))[0];

		const [bondMarketSpl, bondMarketSplBump] = await anchor.web3.PublicKey.findProgramAddress(
			[
			  Buffer.from("bondmarket"),
			  tokenMintAddress.toBuffer(),
			],
			this.bond_program.programId
		);

		const pyth_spl_price_address = this.pyth_map[connection.value][asset]; // sol pubkey address for that connection

		await program.rpc.depositAssetPrintBondSpl(
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
		await this.program.rpc.redeemBonds({
			userVaultBump: this.userVaultBump,
			userAtaBump: this.userHelixAtaBump,
			helixMintBump: this.helixMintBump,
		},{
			accounts:{
			user: this.wallet.publicKey,
			userData: this.userVault,
			mint: this.helixMintAddress,
			userAta: this.userHelixAta,
			tokenProgram: TOKEN_PROGRAM_ID,
			systemProgram: SystemProgram.programId,
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
				collectionAccount: this.userAtaHelix,
				mint: this.helixMintAddress,
				bondAccount: this.bondAccount,
				twstProgram: this.helix_program.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			}
		  });
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	/// twst

	InitializeUserVault = async () => {
		await this.program.rpc.initUserVault(
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
		await this.program.rpc.initUserAta({
				userBump: this.userHelixAtaBump,
				mintBump: this.helixMintBump,
			},
			{
				accounts:{
					userAta: this.userHelixAta,
					payer: this.wallet.publicKey,
					user: this.wallet.publicKey,
					rent: web3.SYSVAR_RENT_PUBKEY,
					mint: this.helixMintAddress,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: SystemProgram.programId,
				},
				// signers:[this.wallet.Keypair],
			}
		);
	}

	// stake amount is in twst
	Stake = async(amount) => {
		await this.helix_program.rpc.stake({
			userVault: this.userVaultBump,
			userAta: this.userAtaHelixBump,
			protocolData: this.protocolDataBump,
			mintBump: this.helixMintBump,
			protocolAta: this.protocolATABump,
		}, new anchor.BN(amount), {
		accounts:{
			userAta: this.userAtaHelix,
			protocAta: this.protocolATA,
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
		await this.helix_program.rpc.rpc.unstake({
		vaultBump: this.userVaultBump,
		protocolDataBump: this.protocolDataBump,
		mintBump: this.helixMintBump,
		protocolAtaBump: this.protocolATABump,
		}, new anchor.BN(amount), {
		accounts:{
			user: this.wallet.publicKey,
			userAta: this.userAtaHelix,
			userVault: this.userVault,
			protocolData: this.protocolDataAccount,
			protocAta: this.protocolATA,
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
			  userHelixAta: this.userAtaHelix,
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
}