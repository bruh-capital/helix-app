import dynamic from "next/dynamic";

//Layouts
import BaseDappLayout from "@layouts/baseDappLayout";

// UI Components
import DashboardUI from "@includes/dashboardUi";
/// todo: add marketplace ui

// Contexts

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

// TODO: add conditional rendering for Bond/stake interface
export default function AppPage({ bondsInfo }) {
	return(
		<BaseDappLayout>
			<PWAprompt 
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Helix to Home Screen"
				copyClosePrompt="Close"
			/>
			<DashboardUI /> 
		</BaseDappLayout>
	)
}