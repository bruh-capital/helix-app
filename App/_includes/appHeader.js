import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {WalletButton} from '@includes/wallet';
import ConnectionButton from '@includes/connection';
import ThemeContext from '@context/themeContext';
import Image from 'next/image';

export default function Header(props) {
	const {theme, setTheme} = React.useContext(ThemeContext);

	return(
		<Popover className='dappHeader'>
		{({ open }) => (
			<>
			<div className='mx-auto px-16 mb-10'>
				<div className='flex justify-between items-center py-2 md:justify-start md:space-x-5 sm:space-x-2'>
					<div className='flex justify-start flex-none'>
						<div 
							className="block object-center content-center xl:inline text-xl lg:text-4xl font-bold"
						>
							<Image 
								src={theme === "light" ? "/icons/helixicon_post.png" : "/icons/helix_icon_black.png"} 
								alt="Helix DAO header icon"
								width="72"
								height="72"
							/>
						</div>
					</div>
					<div className="flex-1 flex space-x-5">
						<div className={"font-semibold text-gray8 bg-gray4 p-0.5 rounded-md"}>Dashboard</div>
						<div className={"text-gray6"}>Staking</div>
						<div className={"text-gray6"}>Bonds</div>
						<div className={"text-gray6"}>Governance</div>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className='bg- rounded-md p-2 inline-flex items-center justify-center text-gray-white hover:bg-gray-900 focus:outline-none'>
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Popover.Group as="nav" className='grid grid-cols-2 hidden divide-gray-600 md:flex space-x-6'>
						<WalletButton/>
						<ConnectionButton/>
					</Popover.Group>
				</div>
			</div>
			<Transition
				show={open}
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel
					focus
					static
					className="absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
				>
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-900 divide-y-2 divide-gray-600">
						<div className="pt-5 pb-6 px-5">	
							<div className="flex items-center justify-between">
								<span
									className="block text-white text-xl font-bold"
									style={{textShadow: "0px 0px 10px rgba(256, 256, 256, 1)"}}
								>
									Helix App
								</span>
								<div className="-mr-2">
									<Popover.Button>
										<span className="sr-only">Close Menu</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="py-6 px-5 space-y-6">
							<div className="grid grid-cols-2 gap-y-4 gap-x-8">
								<WalletButton/>
								<ConnectionButton/>
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
			</>
		)}
		</Popover>
	);
}