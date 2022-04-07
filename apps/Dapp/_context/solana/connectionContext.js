import { createContext } from "react";

const ConnectionCtx = createContext({
	wallet: {},
	setWallet: () => {},
});

export default ConnectionCtx;