import { createContext } from "react";

const LayoutContext = createContext({
	layout: undefined, // string
	setLayout: () => {},
});

export default LayoutContext;