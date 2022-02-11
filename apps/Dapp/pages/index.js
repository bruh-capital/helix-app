import dynamic from "next/dynamic";
import { useContext } from "react";

import LayoutContext from "@context/layoutContext";
import Dash from "@includes/dash";
import Bond from "@includes/bond";
import Stake from "@includes/stake";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

import DappLayout from "@layouts/default";

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