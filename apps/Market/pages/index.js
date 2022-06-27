import Metatags from "@includes/metatags";
import MarketLayout from "@layouts/marketLayout";

import Head from "next/head";

export default function IndexPage(props) {
	return(
		<main>
			<Head>
				<Metatags/>
			</Head>
			<MarketLayout/>
		</main>
	);
}