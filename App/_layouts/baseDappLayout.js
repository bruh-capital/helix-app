import React, {useState} from 'react';
import Head from 'next/head';
import Header from '@includes/appHeader';

export default function BaseDappLayout(props) {
	return(
		<main>
			<Head>
				<title>{props.title}</title>
			</Head>
			<body className='bg-black'>
			<Header/>
				<div className="relative text-center bg-black text-white max-w-2xl px-10 sm:px-3 mx-auto pb-14 lg:pb-20 xl:pb-28">
					{props.children}
				</div>
			</body>
		</main>
	);
}