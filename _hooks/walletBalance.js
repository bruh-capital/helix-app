import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { createContext, useContext, useEffect, useState } from "react";

const BalanceContext = createContext(null);

//const rpcUrl = process.env.NEXT_APP_RPC_URL;
const rpcUrl = "http://localhost:8899";
const connection = new anchor.web3.Connection(rpcUrl);

export default function useWalletBalance() {
	const [balance, setBalance] = useContext(BalanceContext);
	return [balance, setBalance];
}

export const WalletBalanceProvider = ({ children }) => {
	const wallet = useWallet();
	const [ balance, setBalance ] = useState(0);

	useEffect(() => {
		(async () => {
			if (wallet?.publicKey) {
				const balance = await connection.getBalance(wallet.publicKey);
				setBalance(balance/LAMPORTS_PER_SOL);
			}
		})();
	}, [wallet, connection])

	return (
		<BalanceContext.Provider
			value={[ balance, setBalance ]}	
		>
			{children}
		</BalanceContext.Provider>
	)
}