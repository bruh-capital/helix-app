import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";
import Footer from "@includes/footer";
import Dash from "@includes/dash";
import dynamic from "next/dynamic";
import {Canvas} from '@react-three/fiber';

import ThreeBackground from "@includes/threejsbg";

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
		<main className="h-screen bg-lightMobileBg sm:bg-lightDesktopBg dark:bg-darkMobileBg dark:sm:bg-darkDesktopBg bg-cover">
				<Canvas camera={{position:[0,0,5]}}>
				<ThreeBackground/>
				</Canvas>
				<PWAPrompt
					timesToShow={2}
					permanentlyHideOnDismiss={false}
					copyTitle="Add Helix to your homescreen!"
					copyBody="The Helix Portal works best when added to your homescreen. Without doing this, you may have a degraded experience."
					copyClosePrompt="Close"
				/>	
				<MetaTagComponent />
				<Header />
				<Dash />
				<Footer />
			
		</main>
	)
}