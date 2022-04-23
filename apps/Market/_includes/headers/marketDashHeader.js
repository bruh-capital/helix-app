import Logo from "@includes/components/logo";
import {Menu} from "@headlessui/react";
import { useState } from "react";

export default function MarketDashHeader(props) {
	const [categorySelection, setCategorySelection] = useState(null);
	return(
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="flex mx-auto py-1 w-full bg-[#101317] text-white">
				Lower Helix Market Header
			</div>
			<div className="flex mx-auto w-full bg-[#262626] text-white">
				<Logo/>

				<div>
					<input
						type="text"
						placeholder="search in marketplace"
					/>
					<Menu>
						<Menu.Button>
							
						</Menu.Button>
					</Menu>
				</div>


			</div>
		</header>
	);
}