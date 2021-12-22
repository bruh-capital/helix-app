import ReserveLayout from "@layouts/reserve";
import StakeInterface from "@includes/stakeUi";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

export default function AppPage() {
	return(
		<ReserveLayout title={"app"}>
			<PWAprompt 
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Helix Dapp to Home Screen"
				copyClosePrompt="Close"
			/>
			<ToastContainer/>
			<StakeInterface/>
		</ReserveLayout>
	)
}