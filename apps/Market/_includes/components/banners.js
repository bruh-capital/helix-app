import Image from "next/image";

/**
 *	Banner shows a pink mesh + clock announcing release! 
 * @returns {React.Component}
 */
function MarketIntroductionBanner(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-mesh-1-bg bg-cover justify-around content-center items-center">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-around">
                <Image 
                    src="/market/dash/banners/introBannerPurple.png"
                    height={150}
                    width={155}
                    layout="fixed"
                />
				<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto text-left">
					<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-6xl xl:text-6xl max-w-3xl md:my-auto py-2 font-bold text-white">
						Prepare to enter the first blockchain ...
					</span>
					<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-xl xl:font-3xl text-white opacity-75 leading-none">
						Physical, Digital, NFTs, and community marketplace all in one place
					</span>	
				</div>
			</div>
		</div>
	);
}


// Exports 
export {MarketIntroductionBanner}; 