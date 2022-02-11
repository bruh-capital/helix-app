import Image from "next/image";

import { useTheme } from "next-themes";

export default function Dash(props) {
	const { theme, setTheme } = useTheme();
	return(
		<div className="h-screen -mt-24 content-center items-center py-36" >
			<div className="grid relative grid-cols-2 grid-rows-6 lg:grid-rows-3 w-full px-8 md:px-24 h-full space-y-8">
				<div className="flex col-span-2 row-span-1 rounded-xl bg-mesh-1-bg bg-cover">
					<div className="flex flex-row px-4 md:px-12 my-auto justify-around align-center w-full">
						<div className="flex flex-col basis-3/4 h-full">
							<span className="basis-full md:basis-3/4 text-xl md:text-4xl xl:text-7xl md:mb-2 py-2 font-bold text-white">
								Helix is exclusively available on Solana.
							</span>
							<span className="hidden md:flex font-bold basis-1/4 text-xs md:text-xl xl:font-3xl text-white">
								Discover physical and digital marketplaces and more!
							</span>	
						</div>
						<div className="md:flex justify-center align-center basis-1/4">
						{/* Scaling is so bad XD so this is my hack fix */}
							<div className="hidden lg:flex">
								<Image 
									src="/dapp-assets/Card/1/stats.png"
									height={175}
									width={181}
									layout="fixed"
								/>
							</div>
							<div className="flex lg:hidden">
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
				<div className="col-span-1 row-span-3 flex flex-col">
					<div className=" outline-1 outline-[#A5A5A5] dark:outline-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]"></div>
				</div>
				<div className="col-span-1 row-span-1 rounded-md">

				</div>
			</div>
		</div>
	);
}