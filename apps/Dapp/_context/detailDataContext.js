import { createContext } from "react";

const DetailDataContext = createContext({
	data: {},
	setData: () => {},
});

export default DetailDataContext;