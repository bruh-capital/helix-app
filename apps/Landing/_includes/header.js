import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ExternalLinkIcon, MenuIcon } from "@heroicons/react/solid";

export default function Header(props) {
	return(
		<div className="static bg-transparant z-50">
			<div className="mx-auto md:mx-10 px-4 sm:px-6">
				<div className="flex justify-around items-center py-4">
					<div className="flex flex-auto justify-start basis-1/4">
						<Image
							src="/landingassets/3dlogos/4K_3D_icon.png"
							height={72}
							width={72}
						/>
						<div className="text-3xl mt-5 ml-1 md:ml-3 text-white font-[Junegull] align-center text-center">HELIX</div>
					</div>
					<div className="hidden md:flex flex-grow justify-center space-x-8">
						<button className="text-[#909090] hover:text-white">Staking</button>
						<button className="text-[#909090] hover:text-white">Bonding</button>
						<button className="text-[#909090] hover:text-white">Governance</button>
						<Menu as="div">
							<div>
								<Menu.Button className="inline-flex justify-center text-[#909090] hover:text-white">
									More
									<ChevronDownIcon className="h-3 w-3 mt-2" aria-hidden="true"/>
								</Menu.Button>
							</div>
							<Transition 
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute origin-top-right divide-gray-300 divide-y mt-2">
									<div className="px-1 py-1">
										<Menu.Item disabled>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-sm text-[#909090] hover:text-white"
												>
													Helix
												</a>
											)}
										</Menu.Item>
										<Menu.Item disabled>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-sm text-[#909090] hover:text-white"
												>
													Rocks
												</a>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<div className="flex flex-auto basis-1/4 justify-end">
						<button className="hidden md:inline-flex text-white font-md font-semibold">
							Get $HLX
							<ExternalLinkIcon className="h-3 w-3"/>
						</button>
						<Menu as="div">
							<div>
								<Menu.Button className="inline-flex md:hidden text-white">
									<MenuIcon className="h-10 w-10"/>
								</Menu.Button>
							</div>
							<Transition 
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 origin-top-right font-semibold text-white bg-black bg-opacity-70 rounded-xl divide-gray-300 divide-y mt-2">
									<div className="px-2 py-3">
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-md"
												>
													Staking
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-md"
												>
													Bonding
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-md"
												>
													Governance
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className="group flex items-center px-2 py-2 text-md"
												>
													Get $HLX
													<ExternalLinkIcon className="h-3 w-3"/>
												</a>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</div>
		</div>
	);
}