import { createContext } from "react";

const PhysicalMarketClientCtx = createContext({
	physicalMarketClient: {},
	setPhysicalMarketClient: () => {},
});

export default PhysicalMarketClientCtx;