import Header from "@includes/header";
import MetaTagComponent from "@includes/metatags";
import dynamic from "next/dynamic"; 

import { useTheme } from 'next-themes';
import NotificationsSystem, { useNotifications, atalhoTheme } from "reapop";

const PWAPrompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

export default function DappLayout(props) {
	const { theme, setTheme } = useTheme();
	const {notifications, dismissNotification} = useNotifications();

	return(
		<main className="bg-lightMobileBg sm:bg-lightDesktopBg dark:bg-darkMobileBg dark:sm:bg-darkDesktopBg bg-cover">
			<NotificationsSystem
				notifications={notifications}
				dismissNotification={(id) => dismissNotification(id)}
				theme={atalhoTheme}
			/>
			<PWAPrompt
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Helix to your homescreen!"
				copyBody="The Helix Portal works best when added to your homescreen. Without doing this, you may have a degraded experience."
				copyClosePrompt="Close"
			/>	
			<MetaTagComponent />
			<Header />
			{props.children}
		</main>
	)
}