import React, {useState} from 'react';
import Head from 'next/head';
import LandingHeader from '@includes/landingHeader';

export default function ReserveLayout(props) {
	return(
		<main>
			<Head>
				<title>{props.title}</title>
			</Head>
			<body className='bg-black'>
				<LandingHeader title={"Helix App"}/>
				<div className="relative text-center bg-black text-white max-w-2xl px-10 sm:px-3 mx-auto pb-14 lg:pb-20 xl:pb-28">
					{props.children}
				</div>
			</body>
		</main>
	);
}