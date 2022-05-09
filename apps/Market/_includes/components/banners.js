import Image from "next/image";

/**
 *	Banner shows a pink mesh + clock announcing release! 
 * @returns {React.Component}
 */
function MarketIntroductionBanner(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl justify-center">
			<div className="flex flex-row justify-center relative h-full font-sans w-full place-items-center">
				
				<div className="absolute full w-10/12 h-5/6 bottom-0 rounded-xl bg-[#262626] bg-opacity-80">

				</div>
				
				{/* TODO: add dynamic image sizing */}
				<div className="relative sm:w-[175px] sm:h-[175px]">
					<Image 
						src="/market/dash/banners/purpleDashBanner.png"
						layout="fill"
					/>
				</div>
				
				<div className="flex flex-col h-full relative justify-center pl-8">
					<div className="text-left pt-4">
						<span className="leading-none text-lg md:text-2xl xl:text-3xl md:my-auto py-2 font-bold text-white">
							Prepare to enter the first Blockchain Marketplace
						</span>
						<span className="flex font-bold text-xs -mt-1 md:text-lg xl:font-xl text-white opacity-75 leading-none ">
							Physical, Digital, NFTs, and community marketplace all in one place
						</span>	
					</div>
				</div>
			</div>
		</div>
	);
}


// Exports 
export {MarketIntroductionBanner}; 