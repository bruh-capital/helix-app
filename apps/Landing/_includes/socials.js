import Image from "next/image";

export default function Socials(props) {
	return(
		<div className="flex flex-row justify-around w-11/12 md:w-3/5 h-screen mx-auto gap-x-8">
			<div className="flex flex-col justify-center items-center basis-1/2 h-1/12 my-auto">
				<div className="flex font-bold text-white text-2xl md:text-6xl basis-2/3 text-left">
					Keep up with HelixDAO!
				</div>
				<div className="flex font-semibold text-xs md:text-xl text-[#7E8083] text-left">Join the community and stay up to date on what's happening in Helix</div>
			</div>
			<div className="flex flex-col justify-center items-center basis-1/2 gap-y-3">
				<div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010]">
					<div className="flex flex-col justify-center items-center">
						<Image/>
					</div>
				</div>
				<div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010]">
					<div className="flex flex-col justify-center items-center">
						<Image/>
					</div>
				</div>
				<div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010]">
					<div className="flex flex-col justify-center items-center">
						<Image/>
					</div>
				</div>
				<div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010]">
					<div className="flex flex-col justify-center items-center">
						<Image/>
					</div>
				</div>
			</div>
		</div>
	);
}