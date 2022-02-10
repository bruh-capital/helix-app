import dynamic from "next/dynamic";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

import DappLayout from "@layouts/default";

export default function AppPage() {
	return(
		<DappLayout/>
	);
}