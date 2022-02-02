import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";
import Hero from "@includes/hero";

export default function LandingLayout(props) {
	return(
		<main>
			<MetaTagComponent />
			<Header />
			<Hero />
		</main>
	);
}