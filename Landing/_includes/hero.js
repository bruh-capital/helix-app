export default function Hero(props) {
	return(
		<div className="flex h-screen text-center bg-tokenbg -mt-32">
			{/*
			<video className="z-20 -translate-y-32" autoPlay loop>
				<source src="/landingassets/landingpage/bg/k.mp4" type="video/mp4"/>
			</video>
			*/}
			<div className="m-auto flex flex-col">
				<span className="text-6xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#E66EE9] to-[#9293FF]">
					Get more out of your tokens
				</span>
				<span className="text-xl font-bold text-white mb-10">HelixDAO seeks to build user owned platforms to benefit token holders</span>
				<div className="flex m-auto flex-row space-x-12">
					<button className="bg-black text-white text-xl px-8 py-4 font-semibold border-solid border-4 border-[#59A6F4] rounded-2xl shadow-blue-glow-md hover:shadow-blue-glow-lg hover:scale-105">Launch App</button>
					<button className="bg-black text-white text-xl px-8 py-4 font-semibold border-solid border-4 border-[#E66EE9] rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
						Marketplace
						<span className="absolute inline-flex items-center justify-center px-3 py-2 text-sm font-bold leading-none text-white bg-[#E66EE9] rounded-full -translate-y-7 translate-x-1">WIP</span>	
					</button>
				</div>
			</div>
		</div>
	);
}