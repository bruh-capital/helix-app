import { createContext } from "react";

const AccountsClientCtx = createContext({
	accountsClient: {},
	setAccountsClient: () => {},
});

export default AccountsClientCtx;