import { createContext } from "react";

const BondClientCtx = createContext({
	bondClient: {},
	setClient: () => {},
});

export default BondClientCtx;