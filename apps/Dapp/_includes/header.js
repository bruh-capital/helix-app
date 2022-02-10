import Image from "next/image";
import { useTheme } from 'next-themes';
import { Fragment, useContext } from "react";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import { Popover, Transition } from "@headlessui/react";

// Contexts
import LayoutContext from "@context/layoutContext";
import ProtocolContext from "@context/protocolDataContext";

export default function Header(props) {
	const { theme, setTheme } = useTheme();
	const { layout, setLayout } = useContext(LayoutContext);
	const { data, setData } = useContext(ProtocolContext);
	const wallet = useConnectedWallet();
	const { walletProviderInfo, disconnect, providerMut, network, setNetwork } = useSolana();

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
						<div className="flex flex-row m-6 ml-16 space-x-6 md:space-x-10">
						<button
							className={
								"rounded-md text-md px-4 font-semibold " +
								(layout == "dashboard"?
									"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
									"bg-transparent text-[#949494]"
								) 
							}
							onClick={() => {layout !== "dashboard" && setLayout("dashboard")}}
						>Dashboard</button>
						<button
							className={
								"rounded-md text-md px-4 font-semibold " +
								(layout == "stake"?
									"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
									"bg-transparent text-[#949494]"
								) 
							}
							onClick={() => {layout !== "stake" && setLayout("stake")}}
						>Stake</button>
						<button
							className={
								"rounded-md text-md px-4 font-semibold " +
								(layout == "bond"?
									"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
									"bg-transparent text-[#949494]"
								) 
							}
							onClick={() => {layout !== "bond" && setLayout("bond")}}
						>Bond</button>
						</div>
					</div>
					<div className="flex justify-self-end h-full">
						<div className="flex flex-row items-center m-6 space-x-10">
							<div className="text-black font-bold rounded-md py-2 px-4 bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white ">{"$HLX: $" + data.hlxPrice}</div>
							{
								wallet ? 
								(
									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className="px-3 py-2 rounded-md text-black bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white text-ellipsis font-bold"
												>
												<span>{"🔑 " + wallet?.publicKey?.toString()?.slice(0, 10) + "..."}</span>
												</Popover.Button>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-400"
													enterFrom="opacity-0 translate-y-2"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-300"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-2"
												>
													<Popover.Panel className="absolute z-50 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
														<div className="overflow-hidden bg-opacity-75 rounded-md shadow-md bg-white dark:bg-black dark:bg-opacity-75">
															<div className="relative grid p-4 grid-cols-1 space-y-3">
																<button className="rounded-md py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white">Change to Devnet</button>
																<button className="rounded-md py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white">Disconnect</button>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>
								) : (
									<ConnectWalletButton style={{
										"fontStyle": "normal",
										"boxShadow": "none",
										"background":(theme === "light"?"#C8C7CA":"#3A3D45"),
										"color":(theme === "light"?"#000000":"#FFFFFF"),
										"borderRadius": "0.375rem",
										}}
									/>
								)
							}
							<button 
								className="rounded-md py-2 px-4 text-black bg-[#C8C7CA] dark:text-white dark:bg-[#3A3D45]" 
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