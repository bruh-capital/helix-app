import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";

export default function DappLayout(props) {
	return(
		<main>
			<MetaTagComponent />
			<body className="bg-darkMobileBg bg-cover w-full">
				<Header />
			</body>
		</main>
	)
}