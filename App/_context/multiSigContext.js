import { createContext } from "react";


const MULTISIG_ADDRS = {
	'localnet': '',
	'devnet': '',
	'testnet': '',
	'mainnet': ''
}

// make this default to devnet cluster for now
const MSigContext = createContext({
	network: 'devnet',
	endpoint: 'https://api.devnet.solana.com',
	mutliSigAddr: '',
	setNetwork: (network) => {
		network = network.toLowerCase();
		HelixContext.network = network;
		HelixContext.endpoint = CLUSTERS[network];
		HelixContext.multiSigAddr = MULTISIG_ADDRS[network];
	}
});

export default MSigContext;