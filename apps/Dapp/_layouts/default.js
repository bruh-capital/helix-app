import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";

import { useTheme } from 'next-themes';

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();

	return(
		<main className="bg-lightMobileBg sm:bg-lightDesktopBg dark:bg-darkMobileBg dark:sm:bg-darkDesktopBg bg-cover">
			<MetaTagComponent />
			<Header />
			{props.children}
		</main>
	)
}