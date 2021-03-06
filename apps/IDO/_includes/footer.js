import Image from "next/image";

export default function Footer(props) {
	return(
		<div className="flex justify-around pt-5 absolute bottom-0 transparent w-full">
			<div className="flex items-center pt-5 mb-6">
				<Image
					className="mb-2"
					src="/idoassets/2d_logo2.png"
					layout="fixed"
					height={100}
					width={65}
				/>
				<span className="ml-4 text-white text-3xl md:text-4xl font-[junegull] -mb-3">Helix</span>
			</div>
			<div className="hidden md:flex flex-col text-center">
				<h2 className="text-white text-2xl font-bold text-center mb-2">Products</h2>
				<ul className="space-y-3">
					<li className="text-[#bababa] text-sm text-center">Staking</li>
					<li className="text-[#bababa] text-sm text-center">Marketplace</li>
					<li className="text-[#bababa] text-sm text-center">Bonding</li>
				</ul>
			</div>
			<div className="hidden md:flex flex-col text center">
				<h2 className="text-white text-2xl font-bold text-center mb-2">Learn</h2>
				<ul className="space-y-3">
					<li className="text-[#bababa] text-sm text-center">Governance</li>
					<li className="text-[#bababa] text-sm text-center">Docs</li>
				</ul>
			</div>
			<div className="flex md:mt-0 mt-10 flex-col text center">
				<h2 className="text-white text-lg md:text-2xl font-bold text-center mb-1 md:mb-2">Community</h2>
				<div className="flex flex-row justify-around">
					<a href="https://twitter.com/Helix_DAO">
						<Image src="/idoassets/icons/twitter.png" height={29} width={29} />
					</a>
					<a href="https://github.com/bruh-capital">
						<Image src="/idoassets/icons/Vector.png" height={25} width={25} />
					</a>
					<a href="https://discord.gg/rR6M38QT3n">
						<Image src="/idoassets/icons/Frame 1.png" height={32} width={32} />
					</a>
					<a href="https://medium.com/@helixdao">
						<Image src="/idoassets/icons/m.png" height={32} width={32} />
					</a>
				</div>
			</div>
		</div>
	);
}