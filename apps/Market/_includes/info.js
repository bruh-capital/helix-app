import Image from "next/image";

export default function Info(props) {
	return(
		<div className="flex m-auto bg-gradient-to-tr from-[#0FC5FF] to-[#FE4DC2] py-4 md:py-8">
			<div className="flex flex-col items-center justify-center w-full h-full">
				<Image 
					src="/landingassets/landingpage/icons/image 25.png"
					height={44}
					width={40}
				/>
				<div className="text-white text-sm md:text-xl text-center md:mt-2 mt-1 mb-3 md:mb-4">Can the devs do something?<br/>The Helix team is constantly updating and building!</div>
				<button className="bg-white py-2 px-6 rounded-full font-sm text-blue-400">LEARN MORE</button>
			</div>
		</div>
	);
}