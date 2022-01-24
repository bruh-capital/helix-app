import React, {useState} from 'react';
import Head from 'next/head';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

import DappHeader from '@includes/appHeader';

// NOTE: don't change these to div or shit will break
export default function BaseDappLayout(props) {
	const { notifications, dismissNotification } = useNotifications();

	return(
		<main className='overflow-hidden'>
			<Head>
				<title>{props.title}</title>
			</Head>
			<body className='overflow-hidden bg-hero-gradient bg-cover'>
				<NotificationsSystem 
					notifications={notifications}
					dismissNotification={(id) => dismissNotification(id)}
					theme={atalhoTheme}
				/>
				<DappHeader/>
				<div className="relative text-center text-white content-center justify-center max-w-5xl px-10 sm:px-3 mx-auto pb-14 lg:pb-20 xl:pb-28">
					{props.children}
				</div>
			</body>
		</main>
	);
}