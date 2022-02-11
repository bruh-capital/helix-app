import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";
import Dash from "@includes/dash"; 

import { useTheme } from 'next-themes';

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();

	return(
		<main
			className={
				theme === "light" ? "bg-lightMobileBg sm:bg-lightDesktopBg bg-cover" : "bg-darkMobileBg sm:bg-darkDesktopBg bg-cover"
			}
		>
			<MetaTagComponent />
			<Header />
			<Dash />
		</main>
	)
}