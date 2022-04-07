import { createContext } from "react";

const HelixClientCtx = createContext({
	helixClient: {},
	setClient: () => {},
});

export default HelixClientCtx;