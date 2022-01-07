import { createContext } from "react";

const NetContext = createContext({
	network: 'https://api.devnet.solana.com',
	setNetwork: (network) => {},
});

export default NetContext;