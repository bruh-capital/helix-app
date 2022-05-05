import { createContext } from "react";

const ConnectionCtx = createContext({
	connection: {},
	setConnection: () => {},
});

export default ConnectionCtx;