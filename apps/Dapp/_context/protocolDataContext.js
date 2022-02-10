import { createContext } from "react";

const ProtocolContext = createContext({
	data: {},
	setData: () => {},
});

export default ProtocolContext;