import { createContext } from "react";

// Defaults for all networks
const MULTISIG_ADDRS = {
	localnet: '',
	devnet: '2hhSux633AHhbg91viSibSnUSjdzi5dsbyypWjG5Sr2b',
	testnet: '',
	mainnet: ''
}

// Defaults to devnet settings
const MSigContext = createContext({
	mutliSigAddr: MULTISIG_ADDRS.devnet,
	setMultiSigAddr: (addr) => {}
});

export default MSigContext;