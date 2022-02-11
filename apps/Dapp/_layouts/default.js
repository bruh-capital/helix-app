import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";
import { useTheme } from 'next-themes';
import { Html } from "next/document"

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();

	return(
		<>
			<MetaTagComponent />
			<body 
				className={
					theme === "light" ? 
						"bg-lightMobileBg sm:bg-lightDesktopBg bg-cover" :
						"bg-darkMobileBg sm:bg-darkDesktopBg bg-cover"
				}
			>
				<Header />
			</body>
		</>
	)
}