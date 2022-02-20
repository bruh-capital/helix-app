import Image from "next/image";

/**
 *	Card shows a pink mesh + clock announcing release! 
 * @returns {React.Component}
 */
function AvailableCard(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-mesh-1-bg bg-cover justify-around content-center items-center">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-around">
				<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto text-left">
					<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-6xl xl:text-6xl max-w-3xl md:my-auto py-2 font-bold text-white">
						Helix is exclusively available on Solana.
					</span>
					<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-xl xl:font-3xl text-white opacity-75 leading-none">
						Discover privacy marketplaces and more!
					</span>	
				</div>
				<div className="justify-center basis-1/4 align-middle my-auto">
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
	);
}

/**
 * card shows a marketplace link card + a button
 * @returns {react.component}
 */
function MarketCard(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-mesh-2-bg bg-cover justify-around content-center items-center">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-around">
				<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto text-center">
					<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-4xl max-w-3xl md:my-auto py-2 font-bold text-[#3D3D3D]">
						Trade digital and physical assets privately with Helix.
					</span>
					<button className="self-center bg-white bg-opacity-40 font-semibold text-sm md:text-xl px-2 md:px-4 py-1 md:py-2 rounded-lg text-[#6D6D6D] mb-2">
						Coming Soon
					</button>
				</div>
				<div className="justify-center basis-1/4 align-middle my-auto">
					<div className="hidden lg:flex justify-center place-content-center">
						<Image 
							src="/dapp-assets/Card/2/bag.png"
							height={150}
							width={150}
							layout="fixed"
						/>
					</div>
					<div className="flex lg:hidden justify-center place-content-center">
						<Image 
							src="/dapp-assets/Card/2/bag.png"
							height={75}
							width={78}
							layout="fixed"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * card shows a stake link card
 * @returns {react.component}
 */
function StakeCard(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-mesh-3-bg bg-cover justify-around content-center items-center">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-around">
				<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto text-left">
					<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-6xl xl:text-6xl max-w-3xl md:my-auto py-2 font-bold text-white">
						Stake your tokens and earn protocol rewards.
					</span>
					<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-xl xl:font-3xl text-white opacity-75 leading-none">
						Visit the dapp staking page!
					</span>	
				</div>
				<div className="justify-center basis-1/4 align-middle my-auto">
					<div className="hidden lg:flex justify-center place-content-center">
						<Image 
							src="/dapp-assets/Card/3/coins.png"
							height={150}
							width={150}
							layout="fixed"
						/>
					</div>
					<div className="flex lg:hidden justify-center place-content-center">
						<Image 
							src="/dapp-assets/Card/3/coins.png"
							height={75}
							width={75}
							layout="fixed"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// Exports 
export {AvailableCard, MarketCard, StakeCard}; 