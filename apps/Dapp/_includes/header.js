import Image from "next/image";
import { useTheme } from 'next-themes';
import { Tab } from "@headlessui/react";

export default function Header(props) {
	const { theme, setTheme } = useTheme();
	return(
		<div className="static bg-[#E1E1E1] dark:bg-[#191B1F] z-50">
			<div className="mx-auto">
				<div className="flex flex-row justify-between">
					<div className="flex h-full justify-self-start justify-around">
						<Image 
							src={ 
								"/dapp-assets/Logo/" + 
								(theme == "light"? 
								"lightmode.png":
								"Darkmode.png")
							}
							height={89}
							width={159}
							layout="fixed"
						/>
						<button>Dashboard</button>
						<button>Bond</button>
						<button>Stake</button>
					</div>
					<div className="flex justify-self-end h-full text-white text-md font-bold">
					</div>
				</div>
			</div>
		</div>
	);
}