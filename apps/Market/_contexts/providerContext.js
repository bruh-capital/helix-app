import { createContext } from "react";

const ProviderCtx = createContext({
	provider: {},
	setProvider: () => {},
});

export default ProviderCtx;