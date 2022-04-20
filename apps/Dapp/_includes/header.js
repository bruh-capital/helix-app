import Image from "next/image";
import { useTheme } from 'next-themes';
import { Fragment, useContext, useEffect, useState } from "react";

import { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

import { ChartBarIcon, CashIcon, LibraryIcon, LightningBoltIcon, MenuIcon, MoonIcon, SunIcon } from "@heroicons/react/outline"
import { Popover, Transition } from "@headlessui/react";
import { useNotifications } from "reapop";

import SideMenu from "@includes/components/sideMenu";

import * as anchor from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";

// this.provider = new anchor.AnchorProvider(this.connection, wallet, anchor.AnchorProvider.defaultOptions());

// Contexts
import LayoutContext from "@context/layoutContext";
import DetailDataContext from "@context/detailDataContext";

import BasicClientCtx from "@context/clients/basicClientCtx";
import BondClientCtx from "@context/clients/bondClientCtx";
import HelixClientCtx from "@context/clients/twstClientCtx";

import ConnectionCtx from "@context/solana/connectionContext";
import ProviderCtx from "@context/solana/providerContext";

import * as clients from 'helix-clients';

export default function Header(props) {
	const { theme, setTheme } = useTheme();

	const { layout, setLayout } = useContext(LayoutContext);
	const { detailData, setDetailData } = useContext(DetailDataContext);

	const { basicClient, setBasicClient } = useContext(BasicClientCtx);
	const { bondClient, setBondClient } = useContext(BondClientCtx);
	const { helixClient, setHelixClient } = useContext(HelixClientCtx);

	const { connection, setConnection } = useContext(ConnectionCtx);
	const { provider, setProvider } = useContext(ProviderCtx);

	const wallet = useConnectedWallet();
	const goki = useWalletKit();

	const { disconnect } = useSolana();
	const {notify} = useNotifications();

	const [ menuOpen, setMenuOpen ] = useState(false);

	const handleDisconnect = () => {
		try {
			disconnect();
			notify("", "info", { title: "Disconnected!", position: "top-center" });
		} catch(e) {
			notify("", "error", { title: "Error disconnecting!", position: "top-center" });
		}
	}

	useEffect(async ()=>{

		if(wallet){
			let conn = new Connection(process.env.NEXT_PUBLIC_RPC_URL);

			let provider = new anchor.AnchorProvider(
                conn,
				wallet,
				anchor.AnchorProvider.defaultOptions()
			);

			setConnection(conn);

			setProvider(provider);



			setHelixClient(new clients.HelixClient(wallet, conn, provider));
			setBondClient(new clients.BondClient(wallet, conn, provider));
			setBasicClient(new clients.NetworkClient(wallet, conn, provider));
		}else{
			setHelixClient(new clients.HelixClient());
			setBondClient(new clients.BondClient());
			setBasicClient(new clients.NetworkClient());
		}
		
	}, [wallet]);

	return(
		<div className="static bg-[#E1E1E1] dark:bg-[#191B1F] z-50 w-full duration-300">
			<div className="mx-auto">
				<div className="flex flex-row justify-around">
					<div className="flex items-center flex-auto">
						<Image 
							src={ 
								"/3d/" + 
								(theme == "light" ? 
								"4K_3D_black.png":
								"4k_3D_white.png")
							}
							height={90}
							width={90}
							layout="fixed"
						/>
						<div className="hidden sm:flex sm:text-2xl md:text-4xl my-auto -ml-3 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">HELIX</div>
						<div className="hidden flex-row my-6 ml-16 space-x-6 lg:flex lg:space-x-10">
							<button
								className={
									"flex flex-row rounded-md text-md px-4 py-2 font-normal " +
									(layout == "dashboard"?
										"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
										"bg-transparent text-[#949494]"
									) 
								}
								onClick={() => {layout !== "dashboard" && setLayout("dashboard")}}
							>
								<ChartBarIcon className='m-auto mr-2 h-6 w-6' />
								Dashboard
							</button>
							<button
								className={
									"flex flex-row rounded-md text-md px-4 py-2 font-normal " +
									(layout == "stake"?
										"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
										"bg-transparent text-[#949494]"
									) 
								}
								onClick={() => {layout !== "stake" && setLayout("stake")}}
							>
								<CashIcon className='m-auto mr-2 h-6 w-6' />
								Stake
							</button>
							<button
								className={
									"flex flex-row rounded-md text-md px-4 py-2 font-normal " +
									(layout == "bond"?
										"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
										"bg-transparent text-[#949494]"
									) 
								}
								onClick={() => {layout !== "bond" && setLayout("bond")}}
							>
								<LibraryIcon className='m-auto mr-2 h-6 w-6' />
								Bond
							</button>
						</div>
					</div>
					<div className="flex justify-self-end">
						<div className="flex flex-row items-center align-middle m-auto md:m-6 gap-x-4 md:gap-x-10">
							<div className="text-black font-sm sm:font-normal rounded-md py-2 px-4 bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white hidden md:flex">
								<span className="font-medium">{"$HLX:\u00A0"}</span><span className={detailData?.lastHlxPrice > detailData?.hlxPrice ? "text-red-500 font-semibold" : "text-green-500 font-medium"}>{"$" + detailData?.hlxPrice}</span>
							</div>
							{
								wallet ? 
								(
									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className="px-2 md:px-3 py-1 md:py-2 rounded-md text-black bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white text-ellipsis font-sm md:font-normal"
												>
												<span>{"🔑 " + wallet?.publicKey?.toString()?.slice(0, 8) + "..."}</span>
												</Popover.Button>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-400"
													enterFrom="opacity-0 translate-y-2"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-2"
												>
													<Popover.Panel className="absolute z-50 w-screen max-w-sm mt-3 transform left-0 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-0 sm:px-0">
														<div className="overflow-hidden rounded-md shadow-md bg-[#D9D8E2] dark:bg-[#212429]">
															<div className="relative grid p-4 grid-cols-1 space-y-3">
																<button
																	className="rounded-md font-semibold py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white"
																	onClick={handleDisconnect}
																>Disconnect</button>
																<div className="text-black dark:text-white font-semibold text-center">{"Network: " + process.env.NEXT_PUBLIC_RPC_URL}</div>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>
								) : (
									<button 
										className="flex flex-row items-center justify-around text-md font-medium bg-[#C8C7CA] dark:bg-[#353942] px-2 md:px-3 py-1 md:py-2 rounded-md"
										onClick={() => goki.connect()}
									>
										<span>Connect Wallet</span>
										<LightningBoltIcon className="h-4 w-4 pl-1 md:h-6 md:w-6" />
									</button>
								)
							}
							<button 
								className="rounded-md p-2 md:py-2 md:px-4 text-black bg-[#C8C7CA] dark:text-white dark:bg-[#3A3D45]" 
								onClick={() => setTheme(theme === "light"?"dark":"light")}
							>
								{theme == "light"?
									(<MoonIcon className="h-4 w-4 md:h-6 md:w-6"/>):
									(<SunIcon className="h-4 w-4 md:h-6 md:w-6" />)
								}
							</button>
							<button
								className="mr-6 md:mr-0 rounded-md p-2 lg:hidden bg-[#C8C7CA] dark:bg-[#3A3D45]"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								<MenuIcon className="text-black dark:text-white h-4 w-4 md:h-6 md:w-6" />
							</button>
							<SideMenu open={menuOpen} setOpen={setMenuOpen} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}