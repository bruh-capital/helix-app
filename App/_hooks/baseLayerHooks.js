import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect, useMemo} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { notify } from 'reapop';

const toastSettings = {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

/**
 * 
 * @param {number} amount how much does the user want to stake 
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper() {
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
			notify('Staking failed', 'error');
		}
	}
	
	const unstakeToken = async (amount) => {
		try {
			await helixClient.Unstake(amount);
		} catch (e) {
			toast.error("Unstaking Failed!", toastSettings);
		}
	}

	const createUserAta = async () => {
		try {
			await helixClient.CreateUserATA();
		} catch(e) {
			toast.error("Failed to create associated token account!", toastSettings);
		}
	}

	const createVault = async () => {
		try {
			await helixClient.InitializeUserVault();
		} catch (e) {
			toast.error("Failed to create vault!", toastSettings);
		}
	}

	const createBondAccount = async() =>{
		try {
			await helixClient.InitBondAccount();
		} catch (e) {
			toast.error("Failed to create bond account!", toastSettings);
		}
	}

	const solBond = async(bond_price, maturity, connection) =>{
		try {
			await helixClient.SolBond(bond_price, maturity, connection);
		} catch (e) {
			toast.error("Failed to create bond via sol deposit!", toastSettings);
		}
	}

	const splBond = async(bond_price, bond_maturity, asset, connection) =>{
		try {
			await helixClient.SPLBond(bond_price, bond_maturity, asset, connection);
		} catch (e) {
			toast.error("Failed to create bond via spl deposit!", toastSettings);
		}
	}

	const redeemBonds = async() =>{
		try {
			await helixClient.RedeemBonds();
		} catch (e) {
			toast.error("Failed to redeem bonds!", toastSettings);
		}
	}

	const collectCoupon = async() =>{
		try {
			await helixClient.CollectCoupon();
		} catch (e) {
			toast.error("Failed to collect coupons!", toastSettings);
		}
	}

	const changeLockupPeriod = async(duration) =>{
		try {
			await helixClient.ChangeLockup(duration);
		} catch (e) {
			toast.error("Failed to change staking lockup period!", toastSettings);
		}
	}

	const mintAndCloseIdoAccount = async() =>{
		try {
			await helixClient.MintAndCloseIDO();
		} catch (e) {
			toast.error("Failed to mint from and close ido account!", toastSettings);
		}
	}

	const idoDeposit = async(amount) =>{
		try {
			await helixClient.IDODeposit(amount);
		} catch (e) {
			toast.error("Failed to deposit to ido account!", toastSettings);
		}
	}

	const idoWithdraw = async(amount) =>{
		try {
			await helixClient.IDOWithdraw(amount);
		} catch (e) {
			toast.error("Failed to withdraw from ido account!", toastSettings);
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

