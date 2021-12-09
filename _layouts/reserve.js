import React, {useState} from 'react';
import Head from 'next/head';
import LandingHeader from '@includes/landingHeader';

export default function ReserveLayout(props) {
	return(
		<main>
			<Head>
			<title>{props.title}</title>
			<meta name='description' content="Bruh"/>
			<meta property="og:title" content="Bruh Placeholder" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://twst.vercel.app" />
			<meta property="og:image" content="https://pbs.twimg.com/media/FFygM2EVUAAuw8X?format=jpg&name=900x900" />
			<meta property="og:description" content="Bruh Placeholder" />
			<meta name="theme-color" content="#FFFFFF"/>
			<meta name="apple-mobile-web-app-capable" content="yes"/>
			<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
			<link rel="apple-touch-icon" href="https://vercel.com/api/www/avatar/vtqG6EACLOHRK7s64PO0XJu5.png" />
		</Head>
		<body className='bg-black'>
			<LandingHeader title={"bruh app"}/>
			<div className="relative text-center bg-black text-white max-w-2xl px-10 sm:px-3 mx-auto pb-14 lg:pb-20 xl:pb-28">
				{props.children}
			</div>
		</body>
		</main>
	);
}