import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import NotificationSystem, {atalhoTheme, dismissNotification} from 'reapop';

/**
 * creates the helix functions
 * @constructor
 * @param {number} amount how much does the user want to stake 
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper() {
	const [helixClient, _] = useState();
	const wallet = useAnchorWallet();

	useEffect(() => {
		(async () => {
			if (!wallet || !wallet.publicKey) {
				return;
			}

			helixClient = useMemo(() => new HelixNetwork(wallet), [wallet]);
		})
	},[wallet]); 

	const stakeToken = async (amount) => {
		try {
			await helixClient.Stake(amount);
		} catch (e) {
			toast.error("Staking Failed!", toastSettings);
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

	const makeBond = async (assetAmount) => {
		try {
			await helixClient.DepositAssetPrintBond(assetAmount);
		} catch (e) {
			toast.error("Failed to make bond!", toastSettings);
		}
	}

	const redeemBond = async () => {
		try {
			await helixClient.RedeemBonds();
		} catch (e) {
			toast.error("Failed to redeem bond!", toastSettings);
		}
	}

	return { stakeToken, unstakeToken, createUserAta, createVault, makeBond, redeemBond };
}

