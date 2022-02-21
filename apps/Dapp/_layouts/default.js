import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";
import dynamic from "next/dynamic"; 

import { useTheme } from 'next-themes';

const PWAPrompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();

	return(
		<main className="bg-lightMobileBg sm:bg-lightDesktopBg dark:bg-darkMobileBg dark:sm:bg-darkDesktopBg bg-cover">
			<PWAPrompt
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Rari to your homescreen!"
				copyBody="The Rari Portal works best when added to your homescreen. Without doing this, you may have a degraded experience."
				copyClosePrompt="Close"
			/>	
			<MetaTagComponent />
			<Header />
			{props.children}
		</main>
	)
}