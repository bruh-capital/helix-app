import { useContext, useEffect } from "react";

import Dash from "@includes/dash";
import Bond from "@includes/bond";
import Stake from "@includes/stake";
import DappLayout from "@layouts/default";

// Context
import LayoutContext from "@context/layoutContext";


export default function AppPage() {
	const { layout, setLayout } = useContext(LayoutContext);

	return(
		<DappLayout>
			{layout === "dashboard" && <Dash/>}
			{layout === "stake" && <Stake/>}
			{layout === "bond" && <Bond/>}
		</DappLayout>
	);
}