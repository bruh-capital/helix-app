import Image from "next/image";

import { useTheme } from "next-themes";

export default function Dash(props) {
	const { theme, setTheme } = useTheme();
	return(
		<div className="h-screen -mt-24 content-center items-center py-36" >
			<div className="grid relative grid-cols-2 grid-rows-6 lg:grid-rows-3 w-full px-8 md:px-24 h-full space-y-8">
				<div className="flex col-span-2 row-span-1 rounded-xl bg-card1Bg bg-cover">
					<div className="flex flex-row px-12 my-auto justify-around align-center w-full">
						<div className="flex flex-col basis-3/4">
							<span className="basis-3/4 text-3xl md:text-4xl xl:text-6xl mb-2 px-6 md:px-0 py-2 font-bold text-white">
								Helix is exclusively available on Solana.
							</span>
							<span className="font-bold text-lg md:text-xl xl:font-3xl 2xl:-mt-10">
								Discover physical and digital marketplaces and more!
							</span>	
						</div>
						<div>
						<div className="flex justify-center basis-1/4">
							<Image 
								src="/dapp-assets/Card/1/stats.png"
								height={175}
								width={181}
								layout="fixed"
							/>
						</div>
						</div>

					</div>
				</div>
				<div className="col-span-1 row-span-1 rounded-md">
				</div>
				<div className="col-span-1 row-span-1 rounded-md">

				</div>
			</div>
		</div>
	);
}