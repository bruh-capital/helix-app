import Image from "next/image";

export default function Feature(props) {
	return(
		<div className="h-screen flex overflow-hidden">
			<div className="m-auto flex flex-col content-center">
				<h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-5">Helix<br/>Branches</h1>
				<div className="hidden w-full md:flex justify-around mb-10">
					<div className="text-gray-500 text-xl font-bold text-center">
						Helix revenue streams are designed with modularity in mind <br/> Adding new programs is as simple as plug and play
					</div>
				</div>
				{/* Add something here to show details on click for mobile layout */}
				<div className="flex flex-col md:grid md:grid-cols-3 w-full justify-between space-y-4 md:space-y-0">
					<div className="flex h-full flex-col bg-transparent rounded-2xl border-2 border-[#686868] py-4 px-10 md:py-8 items-center m-auto">
						<div className="hidden md:flex">
							<Image 
								src="/landingassets/landingpage/icons/Shopping_cart_perspective_matte.png"
								height={150}
								width={150}
							/>
						</div>
						<span className="text-white text-xl md:text-3xl font-bold border-b-2 border-[#686868] py-2 md:mb-6">Marketplace</span>
						<span className="hidden md:flex text-center text-[#ABABAB] text-sm w-40">A P2P marketplace for both physical and digital goods that keeps you and your items hidden from weirdos like third parties. If you can prove it you can trade it, nobody has to know.</span>
					</div>
					<div className="flex h-full flex-col bg-transparent rounded-2xl border-2 border-[#686868] py-4 px-10 md:py-8 items-center m-auto">
						<div className="hidden md:flex">
							<Image 
								src="/landingassets/landingpage/icons/Bank_perspective_matte.png"
								height={150}
								width={150}
							/>
						</div>
						<span className="text-white text-xl md:text-3xl font-bold border-b-2 border-[#686868] py-2 md:mb-6">Revenue</span>
						<span className="hidden md:flex text-center text-[#ABABAB] text-sm w-40">From delta-neutral strategies to privacy apps Helix builds platforms and apps that make the treasury number go up. Now you can finally touch grass while earning money.</span>
					</div>
					<div className="flex h-full flex-col bg-transparent rounded-2xl border-2 border-[#686868] py-4 px-10 md:py-8 items-center m-auto">
						<div className="hidden md:flex">
							<Image 
								src="/landingassets/landingpage/icons/Government_perspective_matte.png"
								height={150}
								width={150}
							/>
						</div>
						<span className="text-white text-xl md:text-3xl font-bold border-b-2 border-[#686868] py-2 md:mb-6">Governance</span>
						<span className="hidden md:flex text-center text-[#ABABAB] text-sm w-40">Governments and subgovernments allow your voice to be heard accross multiple projects. Submit proposals and fund ventures, together we build the helix.</span>
					</div>
				</div>
			</div>
		</div>
	);
}