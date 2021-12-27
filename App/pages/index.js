import BaseDappLayout from "@layouts/baseDappLayout";
import StakeInterface from "@includes/stakeUi";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import BondInterface from "@includes/bondUi";
import { useState } from "react";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

// TODO: add conditional rendering for Bond/stake interface
export default function AppPage() {
	const [menuPage, setMenuPage] = useState("stake");

	return(
		<BaseDappLayout title={"app"}>
			<ToastContainer/>
			<PWAprompt 
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Helix Dapp to Home Screen"
				copyClosePrompt="Close"
			/>
			<StakeInterface/>
			<BondInterface/>
		</BaseDappLayout>
	)
}