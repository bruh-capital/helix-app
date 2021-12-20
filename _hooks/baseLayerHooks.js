import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useWallet } from "@solana/wallet-adapter-react";

/// Connection + Usage Vars
/*
const programAddr = new anchor.web3.PublicKey(
	process.env.NEXT_APP_PROGRAM_ADDRESS
);
*/

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
//const rpcUrl = "http://localhost:8899";
const connection = new anchor.web3.Connection(rpcUrl);

const txTimeout = 30000;
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
			helixClient.Stake(amount);
		} catch (e) {
			toast.error("Staking Failed!", toastSettings);
		}
	}
	
	const unstakeToken = async (amount) => {
		try {
			helixClient.Unstake(amount);
		} catch (e) {
			toast.error("Unstaking Failed!", toastSettings);
		}
	}

	return { stakeToken, unstakeToken };
}

