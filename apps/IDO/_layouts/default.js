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
		<main className="h-screen static">
			<Canvas camera={{position:[0,0,5]}}>
				<ThreeBackground />
			</Canvas>
			<Header />
			<Dash />
			<Footer />
		</main>
	)
}