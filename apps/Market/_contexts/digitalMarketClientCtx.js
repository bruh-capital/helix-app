import { createContext } from "react";

const DigitalMarketClientCtx = createContext({
	digitalMarketClient: {},
	setDigitalMarketClient: () => {},
});

export default DigitalMarketClientCtx;