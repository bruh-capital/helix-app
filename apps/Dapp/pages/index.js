import { useState, useContext } from "react";
import dynamic from "next/dynamic";

//Layouts
import BaseDappLayout from "@layouts/baseDappLayout";

// UI Components
import BondUI from "@includes/bondUi";
import AccountUI from "@includes/accountUi";
import StakeUI from "@includes/stakeUi";
const PWAprompt = dynamic(
	() => {
	  return import('react-ios-pwa-prompt');
	},
	{ ssr: false }
);

export default function AppPage() {
}