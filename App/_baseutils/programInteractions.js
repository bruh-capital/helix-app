import * as anchor from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js'
import * as idl from '@idl/twist.json';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// TODO(@MILLIONZ): implement error codes within the program so we can show proper errors to the user
export default class HelixInteractions {
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// Variables/Constructor
	constructor(wallet, multisigAddress) {	
		this.SYSTEM_PROGRAM = SystemProgram.programId;
		this.PROGRAM_ID = new PublicKey(idl.metadata.address);
		this.connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_RPC_URL);
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions());
		this.program = new anchor.Program(idl, this.PROGRAM_ID, provider);
		this.multisigAddr = new PublicKey(multisigAddress);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// TOP LEVEL PROGRAM INTERACTIONS
	/**
	 * Stakes HLX tokens within the protocol to earn rebase rewards 
	 * @param {BN} amount amount of HLX to stake
	 */
	StakeHLX = async (amount) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);

		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				process.env.NEXT_PUBLIC_MULTISIG_PUBKEY
			]
		);

		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		await this.program.rpc.stake(
			{
				userVaultBump: userVaultBump,
				useAta: userATABump,
				protocolData: protocolDataBump,
				protocolATABump: protocolATABump,
			},
			amount,
			{
				accounts: {
					userAta: userATA,
					protocAta: protocolATA,
					userVault: userVault,
					protocolData: PrococolDataAccount,
					user: this.wallet.publicKey,
					tokenProgram: this.PROGRAM_ID,
				},
				signers: [this.wallet.Keypair]
			}
		);
	};

	/**
	 * Unstakes available HLX tokens the user has staked within the protocol
	 * @param {BN} amount
	 */
	UnstakeHLX = async (amount) => {
		const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
			[Buffer.from("protocoldataaccount")],
			this.PROGRAM_ID
		);

		const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				process.env.NEXT_PUBLIC_MULTISIG_PUBKEY
			]
		);

		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		await this.program.rpc.unstake(
			{
				userVaultBump: userVaultBump,
				useAta: userATABump,
				protocolData: protocolDataBump,
				protocolATABump: protocolATABump,
			},
			amount,
			{
				accounts: {
					userAta: userATA,
					protocAta: protocolATA,
					userVault: userVault,
					protocolData: PrococolDataAccount,
					user: this.wallet.publicKey,
					tokenProgram: this.PROGRAM_ID,
				},
				signers: [this.wallet.Keypair]
			}
		);
	};

	/**
	 * Rewards from bonds that have passed their vesting time are claimed
	 */
	RedeemBonds = async () => {
		const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("initmint"),
				this.SYSTEM_PROGRAM_ID.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);
		
		await this.program.rpc.redeemBonds(
			{
				userVaultBump: userVaultBump,
				userAtaBump: userATABump,
				mintBump: mintBump,
			},
			{
				accounts:{
					user: this.wallet.publicKey,
					userData: userVault,
					mint: mintAccount,
					userAta: userATA,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: this.SYSTEM_PROGRAM_ID,
				},
			}
		);
	}

	/**
	 * Spends SOL in exchange for creating a new HLX bond
	 * 
	 * FIXME(millionz):
	 * 	this is a name your price function atm...
	 * 	use pyth to get market price and then apply bond discount to it
	 * 
	 * @param {BN} solAmount SOL to spend  
	 * @param {BN} hlxAmount HLX redeemable when bond expires
	 */
	BuySOLBond = async (solAmount, hlxAmount) => {
		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		await this.program.rpc.depositAssetSol(
			userVaultBump,
			solAmount,
			hlxAmount,
			{
				accounts: {
					userVault: userVault,
					treasuryWallet: this.multisigAddr.publicKey,
					systemProgram: this.SYSTEM_PROGRAM_ID,
				}
			}
		);
	}


	/**
	 * Spends SPL in exchange for creating a new HLX bond
	 * @param {BN} splAmount amount of the SPL token you user wants to spend
	 * @param {BN} hlxAmount HLX redeemable when bond expires
	 * @param {String} SPLMintAddr address of the SPL mint program (of the token being deposited)
	 */
	BuySPLBond = async(splAmount, hlxAmount, SPLMintAddr) => {
		const [protocolSPLATA, protocolSPLATABump] = await PublicKey.findProgramAddress(
			[
				this.multisigAddr.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				SPLMintAddr.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("uservault"),
				this.wallet.publicKey.toBuffer()
			],
			this.PROGRAM_ID
		);

		const [userATA, userATABump] = await PublicKey.findProgramAddress(
			[
				Buffer.from("usertokenaccount"),
				this.wallet.publicKey.toBuffer()
			]
		);

		await this.program.rpc.depositAssetSpl(
			{
				protocolATABump: protocolSPLATABump,
				userVaultBump: userVaultBump,
			},
			splAmount,
			hlxAmount,
			{
				user: this.wallet.publicKey,
				userAta: userATA, 
				protocAta: protocolSPLATA,
				mint: SPLMintAddr,
				userVault: userVault,
				tokenProgram: TOKEN_PROGRAM_ID,
			}
		);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////
	// UNDERLYING PROGRAM INTERACTIONS

	/**
	 * Creates 
	 */
}