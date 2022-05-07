import Image from "next/image";

/**
 *	Banner shows a pink mesh + clock announcing release! 
 * @returns {React.Component}
 */
function MarketIntroductionBanner(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-mesh-1-bg bg-cover justify-around">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-center relative h-full font-sans">
				
				<div className="absolute w-10/12 sm:w-full h-5/6 bottom-0 rounded-xl bg-[#262626]">

				</div>

				<Image 
					src="/market/dash/banners/purpleDashBanner.png"
					height={150}
					width={175}
					layout="fixed"
				/>
				
				<div className="flex flex-col basis-3/4 h-full my-auto relative justify-center pl-8">
					<div className="static text-left pt-4">
						<span className="basis-full leading-none text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-auto py-2 font-bold text-white">
							Prepare to enter the first Blockchain Marketplace
						</span>
						<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-md lg:text-lg xl:font-xl text-white opacity-75 leading-none ">
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