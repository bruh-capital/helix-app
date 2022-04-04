import { useContext, useEffect } from "react";

import Dash from "@includes/dash";
import Bond from "@includes/bond";
import Stake from "@includes/stake";
import DappLayout from "@layouts/default";

// Context
import LayoutContext from "@context/layoutContext";
import HelixContext from '@context/helixContext';
import ProtocolContext from "@context/protocolDataContext";

export default function AppPage() {
	const { layout, setLayout } = useContext(LayoutContext);
	const { client, setClient } = useContext(HelixContext);
	const { protocolData, setProtocolData } = useContext(ProtocolContext);

	// Finish later I gtg
	useEffect(async () => {
		setTimeout(async () => {
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
		}, 2000)
	}, [layout]);

	return(
		<DappLayout>
			{layout === "dashboard" && <Dash/>}
			{layout === "stake" && <Stake/>}
			{layout === "bond" && <Bond/>}
		</DappLayout>
	);
}