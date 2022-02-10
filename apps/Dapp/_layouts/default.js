import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";
import { useTheme } from 'next-themes';

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();

	return(
		<main>
			<MetaTagComponent />
			<body 
				className={
					theme === "light" ? 
						"bg-lightMobileBg sm:bg-lightDesktopBg" :
						"bg-darkMobileBg sm:bg-darkDesktopBg"
				}
			>
				<Header />
			</body>
		</main>
	)
}