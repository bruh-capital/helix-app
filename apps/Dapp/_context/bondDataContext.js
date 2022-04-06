import { createContext } from "react";

const BondDataContext = createContext({
	data: undefined,
	setData: () => {},
});

export default BondDataContext;