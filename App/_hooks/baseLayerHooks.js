import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect, useMemo} from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useNotifications } from "reapop";

/**
 * 
 * @param {number} amount how much does the user want to stake 
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper() {
	const { notify } = useNotifications();
	const [helixClient, _] = useState();
	const wallet = useAnchorWallet();

	console.log("helix wrapper called");

	useEffect(() => {
		(async () => {
			if (!wallet || !wallet.publicKey) {
				return;
			}

			helixClient = new HelixNetwork(wallet);
		})()
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
<<<<<<< HEAD
		await helixClient.RedeemBonds();
		// try {
		// 	await helixClient.RedeemBonds();
		// } catch (e) {
		// 	toast.error("Failed to redeem bonds!", toastSettings);
		// }
=======
		try {
			await helixClient.RedeemBonds();
		} catch (e) {
			notify("Failed to redeem bonds!", "error");
		}
>>>>>>> b7687e178b5f9b6a0508213fc5122a0238d5fc4d
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

