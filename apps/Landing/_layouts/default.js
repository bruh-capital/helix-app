import MetaTagComponent from "@includes/metatags";
import Header from "@includes/header";
import Hero from "@includes/hero";
import Feature from "@includes/feature";
import Footer from "@includes/footer";
import Info from "@includes/info";

export default function LandingLayout(props) {
	return(
		<main>
			<MetaTagComponent />
			<Header />
			<Hero />
			<Feature />
			<Info />
			<Footer />
		</main>
	);
}