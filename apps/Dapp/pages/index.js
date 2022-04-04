import { useContext, useEffect } from "react";

import Dash from "@includes/dash";
import Bond from "@includes/bond";
import Stake from "@includes/stake";
import DappLayout from "@layouts/default";

// Context
import LayoutContext from "@context/layoutContext";
import HelixContext from '@context/helixContext';
import ProtocolContext from "@context/protocolDataContext";
import UserDataContext from "@context/userDataContext";

export default function AppPage() {
	const { layout, setLayout } = useContext(LayoutContext);
	const { client, setClient } = useContext(HelixContext);
	const { userVault, setUserVault } = useContext(UserDataContext);
	const { protocolData, setProtocolData } = useContext(ProtocolContext);

	// Loads data for dapp
	useEffect(async () => {
		setTimeout(async () => {
			console.log("Has Client: " + !!client);
			if(client && client?.getUserVault){
				let uv = await client.getUserVault();
				if(uv != undefined){
					setUserVault(userVault);
				}
			}
	
			if(client && client?.getProtocolData){
				let newData = await client.getProtocolData();
				setProtocolData(newData);
			}
		}, 1000)
	}, [client]);

	return(
		<DappLayout>
			{layout === "dashboard" && <Dash/>}
			{layout === "stake" && <Stake/>}
			{layout === "bond" && <Bond/>}
		</DappLayout>
	);
}