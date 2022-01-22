import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect, useMemo} from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useNotifications } from "reapop";

/**
 * Function that returns functions to use for helix
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper() {
	const { notify } = useNotifications();
	const [helixClient, _] = useState();
	const wallet = useAnchorWallet();

	console.log("helix wrapper called");

	useEffect(() => {
		if (!wallet || !wallet.publicKey) {
			console.log("no wallet");
			return;
		}

		helixClient = new HelixNetwork(wallet);
		console.log("wallet set", helixClient);
	},[wallet]); 

	const stakeToken = async (amount) => {
		try {
			await helixClient.Stake(amount);
		} catch (e) {
			notify("Staking failed", "error");
		}
	}
	
	const unstakeToken = async (amount) => {
		try {
			await helixClient.Unstake(amount);
		} catch (e) {
			notify("Unstaking Failed!", "error");
		}
	}

	const createUserAta = async () => {
		try {
			await helixClient.CreateUserATA();
		} catch(e) {
			notify("Failed to create associated token account!", "error");
		}
	}

	const createVault = async () => {
		try {
			await helixClient.InitializeUserVault();
		} catch (e) {
			notify("Failed to create vault!", "error");
		}
	}

	const createBondAccount = async() =>{
		await helixClient.InitBondAccount();
		try {
		 	await helixClient.InitBondAccount();
		} catch (e) {
			notify("Failed to create bond account!", "error");
		}
	}

	const solBond = async(bond_price, maturity, connection) =>{
		try {
			await helixClient.SolBond(bond_price, maturity, connection);
		} catch (e) {
			notify("Failed to create bond via sol deposit!", "error");
		}
	}

	const splBond = async(bond_price, bond_maturity, asset, connection) =>{
		try {
			await helixClient.SPLBond(bond_price, bond_maturity, asset, connection);
		} catch (e) {
			notify("Failed to create bond via spl deposit!", "error");
		}
	}

	const redeemBonds = async() =>{
		try {
			await helixClient.RedeemBonds();
		} catch (e) {
			notify("Failed to redeem bonds!", "error");
		}
	}

	const collectCoupon = async() =>{
		try {
			await helixClient.CollectCoupon();
		} catch (e) {
			notify("Failed to collect coupons!", "error");
		}
	}

	const changeLockupPeriod = async(duration) =>{
		try {
			await helixClient.ChangeLockup(duration);
		} catch (e) {
			notify("Failed to change staking lockup period!", "error");
		}
	}

	const mintAndCloseIdoAccount = async() =>{
		try {
			await helixClient.MintAndCloseIDO();
		} catch (e) {
			notify("Failed to mint from and close ido account!", "error");
		}
	}

	const idoDeposit = async(amount) =>{
		try {
			await helixClient.IDODeposit(amount);
		} catch (e) {
			notify("Failed to deposit to ido account!", "error");
		}
	}

	const idoWithdraw = async(amount) =>{
		try {
			await helixClient.IDOWithdraw(amount);
		} catch (e) {
			notify("Failed to withdraw from ido account!", "error");
		}
	}

	const getTokenAccountBalance = async(amount) =>{
		try {
			await helixClient.GetTokenAccountBalance(amount);
		} catch (e) {
			notify("Failed to get token account balance!", "error");
		}
	}

	const getSolBalance = async(amount) => {
		try {
			await helixClient.GetSolBalance(amount);
		} catch (e) {
			notify("Failed to get wallet balance!", "error");
		}
	}

	return { 
		stakeToken, 
		unstakeToken, 
		createUserAta, 
		createVault,
		createBondAccount, 
		solBond, 
		splBond, 
		redeemBonds, 
		collectCoupon, 
		changeLockupPeriod, 
		mintAndCloseIdoAccount,
		idoDeposit, 
		idoWithdraw
	};
}

