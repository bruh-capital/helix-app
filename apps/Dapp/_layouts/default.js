import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";

export default function DappLayout(props) {
	return(
		<main>
			<MetaTagComponent />
			<Header />
		</main>
	)
}