import Image from "next/image";

export default function Footer(props) {
	return(
		<div className="flex justify-around bg-black pt-12">
			<div className="flex items-center pt-5 pb-7 mb-10">
				<Image
					className="mb-2"
					src="/landingassets/2d_logos/2d_logo2.png"
					layout="fixed"
					height={100}
					width={65}
				/>
				<span className="ml-4 text-white text-4xl font-[junegull] -mb-3">Helix</span>
			</div>
			<div className="hidden md:flex flex-col text center">
				<h2 className="text-[#B1B1B1] text-2xl font-bold text-center mb-2">Products</h2>
				<ul className="space-y-3">
					<li className="text-[#8A8A8A] text-sm text-center">Staking</li>
					<li className="text-[#8A8A8A] text-sm text-center">Marketplace</li>
					<li className="text-[#8A8A8A] text-sm text-center">Bonding</li>
				</ul>
			</div>
			<div className="hidden md:flex flex-col text center">
				<h2 className="text-[#B1B1B1] text-2xl font-bold text-center mb-2">Learn</h2>
				<ul className="space-y-3">
					<li className="text-[#8A8A8A] text-sm text-center">Governance</li>
					<li className="text-[#8A8A8A] text-sm text-center">Docs</li>
				</ul>
			</div>
			<div className="flex flex-col text center">
				<h2 className="text-[#B1B1B1] text-2xl font-bold text-center mb-2">Community</h2>
				<div className="flex flex-row justify-around">
					<a href="https://twitter.com/Helix_DAO">
						<Image src="/landingassets/landingpage/icons/twitter.png" height={29} width={29} />
					</a>
					<a href="https://github.com/bruh-capital">
						<Image src="/landingassets/landingpage/icons/Vector.png" height={25} width={25} />
					</a>
					<a>
						<Image src="/landingassets/landingpage/icons/Frame 1.png" height={32} width={32} />
					</a>
					<a>
						<Image src="/landingassets/landingpage/icons/image 24.png" height={29} width={29} />
					</a>
				</div>
			</div>
		</div>
	);
}