import BaseDappLayout from "@layouts/baseDappLayout";
import StakeInterface from "@includes/stakeUi";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import BondInterface from "@includes/bondUi";
import { useState } from "react";
import AccountUI from "@includes/accountUi";

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

// TODO: add conditional rendering for Bond/stake interface
export default function AppPage({ bondsInfo }) {
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
			<StakeInterface/>
			<BondInterface bondsInfo={bondsInfo}/>
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