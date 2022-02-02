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
				<div className="flex m-auto flex-row space-x-8">
					<button className="bg-black text-white text-xl px-6 py-3 font-semibold border-solid border-4 border-blue-400 rounded-xl">Launch App</button>
					<button className="bg-black text-white text-xl px-6 py-3 font-semibold border-solid border-4 border-purple-400 rounded-xl">Marketplace</button>
				</div>
			</div>
		</div>
	);
}