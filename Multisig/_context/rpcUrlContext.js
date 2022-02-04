import { createContext } from "react";

const RpcUrlContext = createContext({
	rpcUrl: 'https://api.devnet.solana.com',
	setRpcUrl: (network) => {
		console.log(network)
	},
});

export default RpcUrlContext;