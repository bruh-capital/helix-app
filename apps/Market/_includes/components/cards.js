import Image from 'next/image';

// TODO(millionz):
// this is something similar to the card elements on the div...
// you have been warned the asset URLs in here are just temps
// I'm going to try to come back to this once general layout is done

// todo (addendum from indy :P)
// 	on hover, make it pop up (increase width. add 1 to z index. add drop shadow + opacity)
export function WavesCard(props) {
	return(
		<div ref={props.passedRef} className="flex w-full h-full rounded-xl bg-some-card-image-bg bg-cover justify-around content-center items-center">
			<div className="flex flex-row px-4 xl:px-14 py-auto my-auto lg:my-auto justify-around">
				<div className="flex flex-col basis-3/4 h-full items-start align-middle my-auto text-left">
					<span className="basis-full leading-none md:basis-3/4 text-xl md:text-3xl lg:text-6xl xl:text-6xl max-w-3xl md:my-auto py-2 font-bold text-white">
						Main Text here
					</span>
					<span className="flex font-bold basis-1/4 text-xs -mt-1 md:text-xl xl:font-3xl text-white opacity-75 leading-none">
						Subtext here
					</span>	
				</div>
				<div className="justify-center basis-1/4 align-middle my-auto">
					<div className="hidden lg:flex justify-center place-content-center">
						<Image 
							src="some-image.png"
							height={150}
							width={155}
							layout="fixed"
						/>
					</div>
					<div className="flex lg:hidden justify-center place-content-center">
						<Image 
							src="some-image.png"
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