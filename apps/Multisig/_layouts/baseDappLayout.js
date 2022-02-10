import React, {useState} from 'react';
import Head from 'next/head';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

import DappHeader from '@includes/appHeader';
import DashboardUI from '@includes/dashboardUi';

// NOTE: don't change these to div or shit will break
export default function BaseDappLayout(props) {
	const { notifications, dismissNotification } = useNotifications();

	return(
		<main className='overflow-hidden'>
			<Head>
				<title>Multisig</title>
			</Head>
			<NotificationsSystem 
				notifications={notifications}
				dismissNotification={(id) => dismissNotification(id)}
				theme={atalhoTheme}
			/>
			<DappHeader/>
			<DashboardUI/>
		</main>
	);
}