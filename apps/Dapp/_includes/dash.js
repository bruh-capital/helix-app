import Image from "next/image";
import { useContext } from "react";
import Stat from "@includes/components/stat";
import Graph from "@includes/components/graph";

import { useTheme } from "next-themes";
import ProtocolContext from "@context/protocolDataContext";
import CardCarousel from "@includes/components/cardCarousel.";

export default function Dash(props) {
	const { theme, setTheme } = useTheme();
	const { data, setData } = useContext(ProtocolContext);
	return(
		<div className="h-screen -mt-24 items-center pt-28 md:pt-36 pb-8 md:pb-24" >
			<div className="grid grid-cols-1 grid-rows-8 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full space-y-4 md:space-y-8 justify-around">
				<CardCarousel />
				<div className="flex flex-col rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat
						statName="Revenue (24HR)"
						statValue={data?.revenue}
						statChange={data?.revenueChange}
					/>
				</div>
				<div className="flex flex-col rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="HLX Staked (USDC)"
						statValue={data?.stakedHlx}
						statChange={data?.stakedHlxChange}
					/>
				</div>
				<div className="flex flex-col rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="Staking APY (%)"
						statValue={data?.stakingApy}
						statChange={data?.stakingApyChange}
					/>
				</div>
				<div className="flex flex-col rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph
						graphName="TVL"
					/>
				</div>
			</div>
		</div>
	);
}