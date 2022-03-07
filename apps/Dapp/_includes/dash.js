import { useContext, useEffect, useState } from "react";
import Stat from "@includes/components/stat";
import Graph from "@includes/components/graph";

import { useTheme } from "next-themes";
import ProtocolContext from "@context/protocolDataContext";
import CardCarousel from "@includes/components/cardCarousel";

export default function Dash(props) {
	const { data, setData } = useContext(ProtocolContext);

	const [ tvlData, setTvlData ] = useState(null);
	const [ stakeData, setStakeData ] = useState(null);

	// Load all dashboard data from API
	useEffect(async () => {
		// TVL data
		let tvlDataRes = await fetch("/api/v0/tvlData")
			.then(async (res) => await res.json());
		setTvlData(tvlDataRes);

		// Staked tokens data
		let stakeDataRes = await fetch("/api/v0/stakeData")
			.then(async (res) => await res.json());
		setStakeData(stakeDataRes);


	});

	return(
		<div className="h-screen items-center mt-4 lg:mt-10 lg:pb-36" >
			<div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-8 lg:grid-rows-4 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full gap-2 sm:gap-4 lg:gap-8">
				<div className="h-full w-full row-start-1 row-span-1 col-span-1 lg:col-span-2">
					<CardCarousel />
				</div>
				<div className="flex flex-col row-start-2 col-start-1 col-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat
						statName="Revenue (24HR)"
						statValue={data?.revenue}
						statChange={data?.revenueChange}
					/>
				</div>
				<div className="flex flex-col row-start-3 col-start-1 col-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="HLX Staked (USDC)"
						statValue={data?.stakedHlx}
						statChange={data?.stakedHlxChange}
					/>
				</div>
				<div className="flex flex-col row-start-4 col-start-1 col-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="Staking APY (%)"
						statValue={data?.stakingApy}
						statChange={data?.stakingApyChange}
					/>
				</div>
				<div className="flex flex-col row-start-5 lg:row-start-2 col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph
						graphName="TVL"
						graphYAxis="tvl"
						graphData={tvlData}
						currentValue={(tvlData != null || undefined) ? ("$" + tvlData[0].tvl.toLocaleString()) : undefined}
					/>
				</div>
			</div>
		</div>
	);
}