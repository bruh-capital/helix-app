import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";
import Footer from "@includes/footer";
import Dash from "@includes/dash";
import dynamic from "next/dynamic";


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
		<main className="h-screen-5/4 static">
			<ThreeBackground />
			<div className="h-screen-5/4 absolute top-0 w-full">
				<Header />
				<Dash />
				<Footer />
			</div>
		</main>
	)
}