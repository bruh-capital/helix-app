import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

//Layouts
import BaseDappLayout from "@layouts/baseDappLayout";

// UI Components
import BondUI from "@includes/bondUi";
import AccountUI from "@includes/accountUi";
import StakeUI from "@includes/stakeUi";
import DashboardUI from "@includes/dashboardUi";
/// todo: add marketplace ui

// Contexts
import PageContext from "@context/pageContext";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

// TODO: add conditional rendering for Bond/stake interface
export default function AppPage({ bondsInfo }) {
	const { page, setPage } = useContext(PageContext);

	// TODO(@millionz): make on chain client to fetch data about protocol-
	//					if no data is avaiable show loading
	const tempDashData = [
		{ 
			label: "Total Value Deposited", 
			values: undefined, // <- data that gets graphed goes in here
		},
		{ 
			label: "Treasury Value", 
			values: undefined, // <- data that gets graphed goes in here
		},
		{ 
			label: "APY", 
			values: undefined, // <- data that gets graphed goes in here
		},
		{ 
			label: "HLX Staked", 
			values: undefined, // <- data that gets graphed goes in here
		},
	];


	return(
		<BaseDappLayout>
			<ToastContainer/>
			<PWAprompt 
				timesToShow={2}
				permanentlyHideOnDismiss={false}
				copyTitle="Add Helix to Home Screen"
				copyClosePrompt="Close"
			/>
			<AccountUI/>
			{ page === "dash" && <DashboardUI protocolData={tempDashData}/> }
			{ page === "staking" && <StakeUI/> }
			{ page === "bonds" && <BondUI bondsInfo={bondsInfo}/> }
		</BaseDappLayout>
	)
}

export async function getStaticProps() {
	const bondsInfo = [
		{
			Name: 'SOL',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'So11111111111111111111111111111111111111112'
		},
		{
			Name: 'USDC',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		},
		{
			Name: 'wUST',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm',
		},
		/*FIXME(millionz): Implement!
		{
			Name: 'UXD',
			Price: 'N/A',
			Roi: 'N/A%',
			Address: '????',
		},
		{
			Name: 'SOL-HLX LP',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: '',
		},*/
	];

	return {
		props: {
			bondsInfo,
		},
	}
}