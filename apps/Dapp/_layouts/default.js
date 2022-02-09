import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";

export default function DappLayout(props) {
	return(
		<main>
			<MetaTagComponent />
			<body className="bg-lightDesktopBg bg-cover dark:bg-darkDesktopBg">
			<Header />
			</body>
		</main>
	)
}