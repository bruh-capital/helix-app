import { createContext } from "react";

const BundlrClientCtx = createContext({
	bundlrClient: {},
	setBundlrClient: () => {},
});

export default BundlrClientCtx;