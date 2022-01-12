import { useState, useMemo } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function StakeInterface(props) {
	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState(0);

	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond 
	} = HelixWrapper();

	return(
		<div className="grid justify-items-center w-full space-x-5 md:grid-cols-2 sm:grid-cols-1">
			<div className="card flex max-w-sm justify-center bg-white p-3 mt-10">
				<h3 className="card-title">APY</h3>
				<div className="divide"></div>
				<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#58B9FF] to-[#FF61DB]">instert APY here</span>
			</div>
			<div className="card flex max-w-sm justify-center bg-white p-3 mt-10">
				<h3 className="card-title">TVL</h3>
				<div className="divide"></div>
				<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#58B9FF] to-[#FF61DB]">instert APY here</span>
			</div>
			<div className="card flex max-w-md justify-center col-span-2 bg-white p-3 mt-10">
				<h3 className="card-title">{operation}</h3>
			</div>
		</div>
	);
}