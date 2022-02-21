export default function TimeLine(props) {
	return(
		<div className="flex flex-col w-full m-auto py-4 md:py-8 justify-around text-center">
			<div className="text-3xl md:text-5xl font-bold text-white my-auto"> 
				HelixDAO Timeline
			</div>
			<div className="text-xs md:text-base text-[#7E8083] font-semibold mb-7 md:mb-10">
				Check here and our socials to see what we're working on!
			</div>
			<div className="flex flex-row w-full justify-around mb-10 text-center">
				<div className="flex flex-row w-11/12 items-center text-center">
					<div className="basis-1/3 font-semibold text-[#646464]">In Progress</div>
					<div className="basis-1/3 font-semibold text-[#646464]">Upcoming</div>
					<div className="basis-1/3 font-semibold text-[#646464]">Upcoming</div>
				</div>
			</div>
			<div className="flex flex-row bg-gradient-to-tr from-[#FB60FF] to-[#00A3FF] justify-around w-full h-px md:h-[3px] overflow-visible mb-12 text-center">
				<div className="flex flex-row w-11/12">
					<div className="relative basis-1/3 mx-auto text-center">
						<div className="rounded-lg mx-auto w-3/4 lg:w-1/3 -mt-6 flex flex-col items-center justify-center border md:border-2 border-[#C95DF1] bg-black shadow-pink-glow-md text-white text-xs font-semibold py-4">
							Devnet Launch
						</div>
					</div>
					<div className="relative basis-1/3 flex">
						<div className="rounded-full mx-auto -mt-1 md:-mt-2 flex flex-col items-center justify-center bg-white shadow-pink-glow-md text-white text-xs p-1 md:p-2"/>
					</div>
					<div className="relative basis-1/3 flex">
						<div className="rounded-full mx-auto -mt-1 md:-mt-2 flex flex-col items-center justify-center bg-white shadow-pink-glow-md text-white text-xs p-1 md:p-2"/>
					</div>
				</div>
			</div>
			<div className="flex flex-row w-full justify-around mb-10 text-center">
				<div className="flex flex-row w-11/12 items-center text-center">
					<div className="flex flex-col basis-1/3 font-semibold text-white text-left text-xs md:text-base">
						<span className="mx-auto">• Launch Devnet</span>
						<span className="mx-auto">• Open Landing</span>
					</div>	
					<div className="flex flex-col basis-1/3 font-semibold text-white text-left text-xs md:text-base">
						<span className="mx-auto">• Release Mainnet</span>
						<span className="mx-auto">• Seed IDO Event</span>
						<span className="mx-auto">• Open Source</span>
					</div>
					<div className="flex flex-col basis-1/3 font-semibold text-white text-left text-xs md:text-base">
						<span className="mx-auto">• Open Marketplace</span>
					</div>
				</div>
			</div>
		</div>
	);
}