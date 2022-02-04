import { createContext } from "react";

const PageContext = createContext({
	page: "dash",
	setPage: () => {},
});

export default PageContext;