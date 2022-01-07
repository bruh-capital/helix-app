import * as anchor from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js'
import * as idl from '@idl/twist.json';

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
	// Main User Interactions

	/**
	 * Stakes HLX tokens within the protocol to earn rebase rewards 
	 * @param {BN} amount
	 */
	StakeHLX = async (amount) => {
		try {

		} catch (e) {

		}
	};

	/**
	 * Unstakes available HLX tokens the user has staked within the protocol
	 * @param {BN} amount
	 */
	UnstakeHLX = async (amount) => {
		try {

		} catch (e) {

		}
	};

	/**
	 * Rewards from bonds that have passed their vesting time are claimed
	 */
	RedeemBonds = async () => {
		try {

		} catch (e) {

		}
	}

	/**
	 * Spends SOL for HLX bonds
	 * 
	 */
	BuySOLBond = async () => {
		try {

		} catch (e) {

		}
	}


	/**
	 * Spends SPL tokens for HLX bonds
	 */
	BuySPLBond = async() => {
		try {

		} catch (e) {

		}	
	}
}