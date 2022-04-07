import { createContext } from "react";

const BasicClientCtx = createContext({
	basicClient: {},
	setClient: () => {},
});

export default BasicClientCtx;