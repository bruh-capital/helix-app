import { createContext } from "react";

const ProviderCtx = createContext({
	wallet: {},
	setWallet: () => {},
});

export default ProviderCtx;