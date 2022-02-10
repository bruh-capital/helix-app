import { createContext } from "react";

const LayoutContext = createContext({
	layout: "dashboard",
	setLayout: () => {},
});

export default LayoutContext;