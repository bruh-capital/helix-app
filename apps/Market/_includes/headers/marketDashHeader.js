import Logo from "@includes/components/logo";
import WalletButton from "@includes/components/walletButton";
import Searchbar from "@includes/components/searchbar";
import { useState } from "react";

export default function MarketDashHeader(props) {
	const [focused, setFocus] = useState("")
	return(
		<div className="flex mx-auto w-full text-white place-items-center bg-[#262626] bg-opacity-70">
			<Logo/>

			<div className="grow w-full justify-center flex">
				<Searchbar/>
			</div>
			
			<div className="flex flex-row gap-x-4 m-2 h-full">
				<button 
					className="opacity-80 text-gray-500 hover:text-white ease-in-out ease-500 hover:opacity-100"
				>
					Explore
				</button>
				<button 
					className="opacity-80 text-gray-500 hover:text-white ease-in-out ease-500 hover:opacity-100"
				>
					About
				</button>
				<button 
					className="opacity-80 text-gray-500 hover:text-white ease-in-out ease-500 hover:opacity-100"
				>
					Profile
				</button>
			</div>

			{/* todo: add chat as part of dropdown */}

			<WalletButton/>
		</div>
	);
}