import Image from "next/image";
import { useTheme } from 'next-themes';
import { useContext } from "react";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

// Contexts
import LayoutContext from "@context/layoutContext";
import ProtocolContext from "@context/protocolDataContext";

export default function Header(props) {
	const { theme, setTheme } = useTheme();
	const { layout, setLayout } = useContext(LayoutContext);
	const { data, setData } = useContext(ProtocolContext);

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
						<div className="flex flex-row m-6 ml-16 space-x-14">
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "dashboard"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Dashboard</button>
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "stake"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Stake</button>
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "bond"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Bond</button>
						</div>
					</div>
					<div className="flex justify-self-end h-full text-white text-md font-bold">
						<div className="flex flex-row items-center m-6 space-x-12">
							<div className="text-black rounded-lg py-2 px-4 bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white ">{"$HLX: $" + data.hlxPrice}</div>
							<ConnectWalletButton />
							<button 
								className="rounded-lg py-2 px-4 text-black bg-[#C8C7CA] dark:text-white dark:bg-[#3A3D45] font-bold" 
								onClick={() => setTheme(theme === "light"?"dark":"light")}
							>
								{theme == "light"?
									(<MoonIcon className="h-6 w-6"/>):
									(<SunIcon className="h-6 w-6" />)
								}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}