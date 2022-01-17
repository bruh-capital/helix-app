import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export function WalletButton(props) {
	const wallet = useAnchorWallet();
	return(
		<WalletMultiButton
			className={"font-bold rounded-md py-3 p-6"}
			style={{
				boxShadow: (wallet ? "0px 0px 10px #34d399" : "0px 0px 10px rgba(256, 256, 256, 1)"),
				background: (wallet ? "#34D399" : "linear-gradient(to right, #58B9FF, #FF61DB)"),
				color: "#FFF"
			}}
		>
			{!wallet ? "Connect Wallet" : "Connected"}
		</WalletMultiButton>
	);
}