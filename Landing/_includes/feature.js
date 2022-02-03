import Image from "next/image";

export default function Feature(props) {
	return(
		<div className="h-screen flex">
			<div className="mx-auto mt-40 flex flex-col content-center">
				<h1 className="text-white text-6xl font-bold text-center mb-5">Helix<br/>Branches</h1>
				<div className="w-full flex justify-around mb-16">
					<div className="text-gray-500 text-xl font-bold text-center">
						Helix branches are designed with modularity in mind <br/> Adding new functionalities is as easy as plug and play
					</div>
				</div>
				<div className="flex flex-row w-full space-x-8">
					<div className="flex flex-col bg-transparent rounded-2xl border-2 border-[#686868] px-10 py-8 items-center m-auto">
						<Image 
							src="/landingassets/landingpage/icons/Shopping_cart_perspective_matte.png"
							height={150}
							width={150}
						/>
						<span className="text-white text-3xl font-bold border-b-2 border-[#686868] py-2 mb-6">Marketplace</span>
						<span className="text-center text-[#ABABAB] text-sm w-40">Bro have you ever watched any anime bro? Basically we're the shadowy supercoders with anime pfps that MGNR talks about all day.</span>
					</div>
					<div className="flex flex-col bg-transparent rounded-2xl border-2 border-[#686868] px-10 py-8 items-center m-auto">
						<Image 
							src="/landingassets/landingpage/icons/Bank_perspective_matte.png"
							height={150}
							width={150}
						/>
						<span className="text-white text-3xl font-bold border-b-2 border-[#686868] py-2 mb-6">Revenue</span>
						<span className="text-center text-[#ABABAB] text-sm w-40">Bro have you ever watched any anime bro? Basically we're the shadowy supercoders with anime pfps that MGNR talks about all day.</span>
					</div>
					<div className="flex flex-col bg-transparent rounded-2xl border-2 border-[#686868] px-10 py-8 items-center m-auto">
						<Image 
							src="/landingassets/landingpage/icons/Government_perspective_matte.png"
							height={150}
							width={150}
						/>
						<span className="text-white text-3xl font-bold border-b-2 border-[#686868] py-2 mb-6">Governance</span>
						<span className="text-center text-[#ABABAB] text-sm w-40">Bro have you ever watched any anime bro? Basically we're the shadowy supercoders with anime pfps that MGNR talks about all day.</span>
					</div>
				</div>
			</div>
		</div>
	);
}