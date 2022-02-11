import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";

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
			{props.children}
		</main>
	)
}