import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export function WalletButton(props) {
	const wallet = useAnchorWallet();
	return(
		<WalletMultiButton
			className={"font-bold rounded-md py-3 p-6" + (!wallet?.connected ? "bg-gradient-to-r from-[#58B9FF] to-[#FF61DB]" : "bg-[#34D399]")}
		>
			{!wallet?.connected ? "🔑 Connect Wallet" : "Connected"}
		</WalletMultiButton>
	);
}