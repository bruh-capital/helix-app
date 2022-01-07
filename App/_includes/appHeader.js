import React, { Fragment } from 'react';

// Tailwind Related junk
import 'tailwindcss/tailwind.css';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import WalletButtonFake, {WalletButton} from '@includes/wallet';

export default function Header(props) {
	return(
		<Popover className='bg-black'>
		{({ open }) => (
			<>
			<div className='mx-auto px-16'>
				<div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
					<div className='flex justify-start lg:flex-1 lg:w-0'>
						<span 
							className="block text-white xl:inline text-xl lg:text-4xl font-bold"
							style={{textShadow: "0px 0px 10px rgba(256, 256, 256, 1)"}}
						>
						Helix App
						</span>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className='bg- rounded-md p-2 inline-flex items-center justify-center text-gray-white hover:bg-gray-900 focus:outline-none'>
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Popover.Group as="nav" className='hidden divide-gray-600 md:flex space-x-10'>
						<WalletButton/>
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