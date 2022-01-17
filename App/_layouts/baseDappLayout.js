import React, {useState} from 'react';
import Head from 'next/head';
import DappHeader from '@includes/appHeader';

export default function BaseDappLayout(props) {
	return(
		<div className='overflow-hidden'>
			<Head>
				<title>{props.title}</title>
			</Head>
			<div className='overflow-hidden bg-hero-gradient bg-cover'>
				<DappHeader/>
				<div className="relative text-center text-white content-center justify-center max-w-5xl px-10 sm:px-3 mx-auto pb-14 lg:pb-20 xl:pb-28">
					{props.children}
				</div>
			</div>
		</div>
	);
}