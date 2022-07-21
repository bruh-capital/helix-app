import { createContext } from "react";

const JupiterClientCtx = createContext({
	jupiterClient: {},
	setJupiterClient: () => {},
});

export default JupiterClientCtx;