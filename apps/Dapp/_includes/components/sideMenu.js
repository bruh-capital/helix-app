import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image';

import { useTheme } from 'next-themes';
import LayoutContext from '@context/layoutContext';

export default function DappSideMenu(props) {
	const { theme, setTheme } = useTheme();
	const { layout, setLayout } = useContext(LayoutContext);

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
									<div className="flex items-center justify-center">
										<Image 
											src={ 
												"/3d/" + 
												(theme == "light"? 
												"4K_3D_black.png":
												"4K_3D_white.png")
											}
											height={120}
											width={120}
											layout="fixed"
										/>
										<div className="hidden sm:flex text-5xl mt-10 my-auto -ml-5 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">HELIX</div>
									</div>
									<div className="mt-6 relative flex-1 px-4 sm:px-6">
										<div className="absolute content-center items-center inset-0 px-4 sm:px-6">
											<div className="flex flex-col px-4 py-3 space-y-2 items-center">
												<button
													className={
														"rounded-md text-xl px-4 font-semibold " +
														(layout == "dashboard"?
															"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
															"bg-transparent text-[#949494]"
														) 
													}
													onClick={() => {layout !== "dashboard" && setLayout("dashboard")}}
												>Dashboard</button>
												<button
													className={
														"rounded-md text-xl px-4 font-semibold " +
														(layout == "stake"?
															"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
															"bg-transparent text-[#949494]"
														) 
													}
													onClick={() => {layout !== "stake" && setLayout("stake")}}
												>Stake</button>
												<button
													className={
														"rounded-md text-xl px-4 font-semibold " +
														(layout == "bond"?
															"bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white":
															"bg-transparent text-[#949494]"
														) 
													}
													onClick={() => {layout !== "bond" && setLayout("bond")}}
												>Bond</button>
											</div>
											<div>
												<a>
													<div></div>
												</a>
												<a>
													<div></div>
												</a>
												<a>
													<div></div>
												</a>
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
