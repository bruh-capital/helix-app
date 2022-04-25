import Logo from "@includes/components/logo";
import WalletButton from "@includes/components/walletButton";
import Searchbar from "@includes/components/searchbar";

export default function MarketDashHeader(props) {
	return(
		<div className="flex mx-auto w-full bg-[#262626] text-white">
			<Logo/>

			<Searchbar/>
			
			<div>
				<button className="transparent-100 text-gray-500">
					Explore
				</button>
				<button className="transparent-100 text-gray-500">
					About
				</button>
				<button className="transparent-100 text-gray-500">
					Profile
				</button>
			</div>

			{/* todo: add chat as part of dropdown */}

			<WalletButton/>
		</div>
	);
}