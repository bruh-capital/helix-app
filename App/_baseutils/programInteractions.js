import * as anchor from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js'
import * as idl from '@idl/twist.json';
import AppMetaTagComponent from '@includes/metaTags';

// TODO(@MILLIONZ): implement error codes within the program so we can show proper errors to the user
export default class HelixInteractions {
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// Variables/Constructor
	constructor(wallet) {	
		this.SYSTEM_PROGRAM = SystemProgram.programId;
		this.PROGRAM_ID = new PublicKey(idl.metadata.address);
		this.connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_RPC_URL);
		this.provider = new anchor.Provider(this.connection, wallet, anchor.Provider.defaultOptions());
		this.program = new anchor.Program(idl, this.PROGRAM_ID, provider);
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

		const [protocolATA,] = await PublicKey.findProgramAddress(
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
			},
			new anchor.BN(amount),
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

	};

	/**
	 * Rewards from bonds that have passed their vesting time are claimed
	 */
	RedeemBonds = async () => {
		
	}

	/**
	 * Spends SOL in exchange for creating a new HLX bond
	 * 
	 */
	BuySOLBond = async () => {
	}


	/**
	 * Spends SPL in exchange for creating a new HLX bond
	 */
	BuySPLBond = async() => {
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////
	// UNDERLYING PROGRAM INTERACTIONS

	/**
	 * Creates 
	 */
}