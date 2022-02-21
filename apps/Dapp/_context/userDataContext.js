import { createContext } from "react";

const UserDataContext = createContext({
	data: {},
	setData: () => {},
});

export default UserDataContext;