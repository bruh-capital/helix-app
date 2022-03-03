import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

export default function Header(props) {
	const wallet = useConnectedWallet();
	const goki = useWalletKit();
	const { walletProviderInfo, disconnect, providerMut, network, setNetwork } = useSolana();	

	return(
		<div className="static z-50 w-full duration-300 transparent">
			<div className="mx-auto">
				<div className="flex flex-row justify-around">
					<div className="flex items-center flex-auto">
						<Image 
							src={ 
								"/3d/4K_3D_white.png"
							}
							height={90}
							width={90}
							layout="fixed"
							priority={true}
						/>
						<div className="hidden sm:flex sm:text-2xl md:text-4xl my-auto -ml-3 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">HELIX</div>
					</div>
					<div className="flex justify-self-end">
						<div className="flex flex-row items-center align-middle m-auto md:m-6 gap-x-4 md:gap-x-10">
							{wallet?.connected?
							<Popover className="relative">
							{({ open }) => (
								<>
									<Popover.Button
										className="px-2 md:px-3 py-1 md:py-2 rounded-md text-black bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white text-ellipsis font-sm md:font-normal"
									>
									<span>Wallet</span>
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
										<Popover.Panel className="absolute z-50 w-screen max-w-sm mt-3 transform left-0 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-0 sm:px-0">
											<div className="overflow-hidden bg-opacity-100 rounded-md shadow-md bg-[#C0C0C0] dark:bg-black dark:bg-opacity-75">
												<div className="relative grid p-4 grid-cols-1 space-y-3">
													<button
														className="rounded-md font-normal py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white hover:scale-105 duration-300"
														onClick={() => {
															setNetwork("devnet")
														}}
													>Change to Devnet</button>
													<button
														className="rounded-md font-normal py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white hover:scale-x-105 duration-300"
														onClick={disconnect}//disconnect
													>Disconnect</button>
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>:
						<></>}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}