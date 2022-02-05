import { useState, useContext } from "react";
import dynamic from "next/dynamic";

//Layouts
import BaseDappLayout from "@layouts/baseDappLayout";

// UI Components
import DashboardUI from "@includes/dashboardUi";
/// todo: add marketplace ui

const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

// TODO: add conditional rendering for Bond/stake interface
export default function AppPage({ bondsInfo }) {

	return(
		<BaseDappLayout/>

	)
}

export async function getStaticProps() {
	const bondsInfo = [
		{
			Name: 'SOL',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			// this is just for SOL
			// i didnt know we were doing wSOL
			TestNetAddress: '11111111111111111111111111111111',
			MainNetAddress: 'So11111111111111111111111111111111111111112',
			Decimals: 9,
		},
		{
			Name: 'USDC',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: 'yxdMpffjwBqPnokGfZY2AaTJDzth3umWcqiKFn9fGJz',
			MainNetAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
			Decimals: 6,
		},
		{
			Name: 'wUST',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: 'AZ2taR7C7LrGuCXApgCcyxfLsDM7HJH8aDyRHFCRY2WE',
			MainNetAddress: 'CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm',
			Decimals: 9,
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