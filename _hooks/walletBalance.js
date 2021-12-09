import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { createContext, useContext } from "react";

const BalanceContext = createContext(null);

const rpcUrl = process.env.NEXT_APP_RPC_URL;
const connection = new anchor.web3.Connection(rpcUrl);

export default function useWalletBalance() {
	const [balance, setBalance] = useContext(BalanceContext);
	return [balance, setBalance];
}