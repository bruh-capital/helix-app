import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
	CashIcon,
	ChartBarIcon,
	ExternalLinkIcon,
	InformationCircleIcon,
	LibraryIcon,
	ShoppingBagIcon,
	UserGroupIcon,
	XIcon
} from '@heroicons/react/outline'
import Image from 'next/image';

import { useTheme } from 'next-themes';

export default function DappSideMenu(props) {
	const { theme, setTheme } = useTheme();

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={props.setOpen}>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="relative w-screen max-w-md">
								<div className="h-full flex flex-col pb-6 bg-[#E1E1E1] dark:bg-[#191B1F] shadow-xl overflow-y-scroll">
									<div className="flex items-center justify-start px-4 pt-4 pb-0">
										<button
											type="button"
											className="rounded-md text-[#3E3E3E] dark:hover:text-white hover:text-black"
											onClick={() => props.setOpen(false)}
										>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
									<div className="flex items-center justify-center sm:-ml-6">
										<Image 
											src={ 
												"/3d/" + 
												(theme == "light"? 
												"4K_3D_black.png":
												"4k_3D_white.png")
											}
											height={120}
											width={120}
											layout="fixed"
										/>
										<div className="hidden sm:flex text-5xl mt-10 my-auto -ml-5 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">HELIX</div>
									</div>
									<div className="mt-6 relative flex-1 px-4 sm:px-6">
										<div className="flex flex-col content-center items-center h-full inset-0 px-4 sm:px-6">
											<div className="flex flex-col px-4 py-3 space-y-2 items-center">
												
											</div>
											<div className="flex flex-col gap-y-4 m-auto w-1/2 mb-16">
												<a className="flex">
													<div className="flex flex-row items-center text-[#949494]">
														<InformationCircleIcon className="h-6 w-6 mr-3 text-black dark:text-white"/>
														Learn
														<ExternalLinkIcon className="h-3 w-3 ml-1"/>
													</div>
												</a>
												<a className="flex">
													<div className="flex flex-row items-center text-[#949494]">
														<UserGroupIcon className="h-6 w-6 mr-3 text-black dark:text-white"/>
														Governance
														<ExternalLinkIcon className="h-3 w-3 ml-1"/>
													</div>
												</a>
												<a className="flex">
													<div className="flex flex-row items-center text-[#949494]">
														<ShoppingBagIcon className="h-6 w-6 mr-3 text-black dark:text-white"/>
														Marketplace
														<ExternalLinkIcon className="h-3 w-3 ml-1"/>
													</div>
												</a>
											</div>
											<div className="flex flex-row justify-around gap-4 bottom-0">
												<div className="flex flex-row items-center pt-1 gap-x-2 justify-between rounded-md px-4 bg-[#C8C7CA] dark:bg-[#3A3D45]">
													<a href="https://twitter.com/Helix_DAO">
														<Image src="/dapp-assets/icons/assets/twitter.png" height={29} width={29} />
													</a>
													<a href="https://github.com/bruh-capital">
														<Image src="/dapp-assets/icons/assets/Vector.png" height={25} width={25} />
													</a>
													<a>
														<Image src="/dapp-assets/icons/assets/discord.png" height={25} width={25} />
													</a>
													<a>
														<Image src="/dapp-assets/icons/assets/medium.png" height={29} width={29} />
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}