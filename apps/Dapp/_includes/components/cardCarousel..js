import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CardCarousel() {
	return(
		<Carousel autoPlay infiniteLoop stopOnHover className="h-full w-full col-span-2 row-span-1" >
			<div className="flex w-full rounded-xl bg-mesh-1-bg bg-cover">
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
			<div>
				<h3>2</h3>
			</div>
			<div>
				<h3>3</h3>
			</div>
		</Carousel>
	);
}