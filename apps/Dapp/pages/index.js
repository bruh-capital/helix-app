import { useContext, useEffect } from "react";

import LayoutContext from "@context/layoutContext";
import Dash from "@includes/dash";
import Bond from "@includes/bond";
import Stake from "@includes/stake";
import DappLayout from "@layouts/default";

export default function AppPage() {
	const { layout, setLayout } = useContext(LayoutContext);

	// Finish later I gtg
	useEffect(async () => {
		setTimeout(async () => {}, 2000)
	}, [layout]);

	return(
		<DappLayout>
			{layout === "dashboard" && <Dash/>}
			{layout === "stake" && <Stake/>}
			{layout === "bond" && <Bond/>}
		</DappLayout>
	);
}