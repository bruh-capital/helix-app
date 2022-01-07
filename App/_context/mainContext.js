import { createContext } from "react";

CLUSTERS = {
	'localnet': 'http://localhost:8899',
	'devnet': 'https://api.devnet.solana.com',
	'testnet': 'https://api.testnet.solana.com',
	'mainnet': 'https://api.mainnet-beta.solana.com',
};

MULTISIG_ADDRS = {
	'localnet': '',
	'devnet': '',
	'testnet': '',
	'mainnet': ''
}

// make this default to testnet cluster for now
export default HelixContext = createContext({
	network: 'testnet',
	endpoint: 'https://api.testnet.solana.com',
	mutliSigAddr: '',
	setNetwork: (network) => {
		HelixContext.network = network;
		HelixContext.endpoint = CLUSTERS[network];
		HelixContext.mutliSigAddr = MULTISIG_ADDRS[network];
	}
});