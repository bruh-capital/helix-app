import { createContext } from "react";

const CLUSTERS = {
	'localnet': 'http://localhost:8899',
	'devnet': 'https://api.devnet.solana.com',
	'testnet': 'https://api.testnet.solana.com',
	'mainnet': 'https://api.mainnet-beta.solana.com',
};

const MULTISIG_ADDRS = {
	'localnet': '',
	'devnet': '',
	'testnet': '',
	'mainnet': ''
}

// make this default to devnet cluster for now
const HelixContext = createContext({
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

export default HelixContext;