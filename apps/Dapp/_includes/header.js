import Image from "next/image";
import { useTheme } from 'next-themes';
import { useContext } from "react";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

// Contexts
import LayoutContext from "@context/layoutContext";
import ProtocolContext from "@context/protocolDataContext";
import { NonceAccount } from "@solana/web3.js";

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
								"/3d/" + 
								(theme == "light"? 
								"4K_3D_black.png":
								"4K_3D_white.png")
							}
							height={90}
							width={90}
							layout="fixed"
						/>
						<div className="text-4xl my-auto -ml-3 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">HELIX</div>
						<div className="flex flex-row m-6 ml-16 space-x-14">
						<button
							className={
								"rounded-md px-4 m-5" +
								(layout == "dashboard"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
							onClick={() => {layout === "dashboard" && setLayout("dashboard")}}
						>Dashboard</button>
						<button
							className={
								"rounded-md px-4 m-5" +
								(layout == "stake"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
							onClick={() => {layout === "stake" && setLayout("stake")}}
						>Stake</button>
						<button
							className={
								"rounded-md px-4 m-5" +
								(layout == "bond"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#3A3D45] dark:text-white":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
							onClick={() => {layout === "bond" && setLayout("bond")}}
						>Bond</button>
						</div>
					</div>
					<div className="flex justify-self-end h-full text-white text-md font-bold">
						<div className="flex flex-row items-center m-6 space-x-12">
							<div className="text-black rounded-lg py-2 px-4 bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white ">{"$HLX: $" + data.hlxPrice}</div>
							<ConnectWalletButton style={{
								"boxShadow": "none",
								"background":(theme === "light"?"#C8C7CA":"#3A3D45"),
								"color":(theme === "light"?"#000000":"#FFFFFF"),
								"borderRadius": "0.375rem",
								}} 
							/>
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