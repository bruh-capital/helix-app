import Image from "next/image";
import { useContext } from "react";
import Stat from "@includes/components/stat";
import Graph from "@includes/components/graph";

import { useTheme } from "next-themes";
import ProtocolContext from "@context/protocolDataContext";


export default function Dash(props) {
	const { theme, setTheme } = useTheme();
	const { data, setData } = useContext(ProtocolContext);
	return(
		<div className="h-screen -mt-24 content-center items-center pt-28 md:pt-36 pb-0 md:pb-24" >
			<div className="grid gap-x-24 grid-cols-2 grid-rows-6 lg:grid-rows-4 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full space-y-2 md:space-y-8 justify-around">
				<div className="flex col-span-2 row-span-1 rounded-xl bg-mesh-1-bg bg-cover overflow-hidden">
					<div className="flex flex-row px-4 xl:px-14 py-auto my-auto md:my-4 lg:my-auto justify-around align-center w-full">
						<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto">
							<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-6xl xl:text-6xl max-w-3xl md:my-auto py-2 font-bold text-white">
								Helix is exclusively available on Solana.
							</span>
							<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-xl xl:font-3xl text-white leading-none">
								Discover privacy marketplaces and more!
							</span>	
						</div>
						<div className="justify-center basis-1/4 align-middle my-auto">
						{/* Scaling is so bad XD so this is my hack fix */}
							<div className="hidden lg:flex justify-center place-content-center">
								<Image 
									src="/dapp-assets/Card/1/stats.png"
									height={150}
									width={155}
									layout="fixed"
								/>
							</div>
							<div className="flex lg:hidden justify-center place-content-center">
								<Image 
									src="/dapp-assets/Card/1/stats.png"
									height={75}
									width={78}
									layout="fixed"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col col-span-2 lg:col-span-1 row-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat
						statName="Revenue (24HR)"
						statValue={data?.revenue}
						statChange={data?.revenueChange}
					/>
				</div>
				<div className="flex flex-col col-span-2 lg:col-span-1 row-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="HLX Staked (USDC)"
						statValue={data?.stakedHlx}
						statChange={data?.stakedHlxChange}
					/>
				</div>
				<div className="flex flex-col col-span-2 lg:col-span-1 row-span-1 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Stat 
						statName="Staking APY (%)"
						statValue={data?.stakingApy}
						statChange={data?.stakingApyChange}
					/>
				</div>
				<div className="flex col-start-1 lg:md:col-start-2 row-start-2 flex-col col-span-2 lg:col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph
						graphName="TVL"
					/>
				</div>
			</div>
		</div>
	);
}