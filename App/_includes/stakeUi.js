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
		<div className="grid justify-items-center justify-center w-full grid-cols-2">
			<div className="card flex justify-center bg-white p-3 mt-10">
				<h3 className="font-semibold text-2xl text-gray8">APY</h3>
				<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#58B9FF] to-[#FF61DB]">instert APY here</span>
			</div>
			<div className="card flex justify-center bg-white p-3 mt-10">
				<h3 className="font-semibold text-2xl text-gray8">TVL</h3>
				<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#58B9FF] to-[#FF61DB]">instert APY here</span>
			</div>
			<div className="card flex justify-center col-span-2 bg-white p-3" style={{marginLeft: 0}}>
				<h3 className="font-semibold">{operation}</h3>
			</div>
		</div>
	);
}