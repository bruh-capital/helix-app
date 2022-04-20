import Metatags from "@includes/metatags";
import Header from "@includes/header";

import Head from "next/head";

export default function HomeLayout(props) {
	return(
		<main>
			<Head>
				<Metatags/>
			</Head>
			<Header/>
			{props.children}
		</main>
	);
}