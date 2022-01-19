import React, { Fragment, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {WalletButton} from '@includes/wallet';
import ConnectionButton from '@includes/connection';
import PageContext from '@context/pageContext';
import ThemeContext from '@context/themeContext';
import Image from 'next/image';

export default function Header(props) {
	const {theme, setTheme} = useContext(ThemeContext);
	const {page, setPage} = useContext(PageContext);

	const toBase64 = (str) => typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str)

	const shimmer = (w, h) => `
		<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<defs>
				<linearGradient id="g">
					<stop stop-color="#ccc" offset="20%" />
					<stop stop-color="#eee" offset="50%" />
					<stop stop-color="#fff" offset="70%" />
				</linearGradient>
			</defs>
			<rect width="${w}" height="${h}" fill="#fff" />
			<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
			<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
		</svg>`;

	return(
		<Popover className='dappHeader'>
		{({ open }) => (
			<>
			<div className='mx-auto px-16 mb-10'>
				<div className='flex justify-between content-center items-center py-2 md:justify-start md:space-x-5 sm:space-x-2'>
					<div className='flex justify-start flex-none'>
						<div 
							className="flex object-center content-center xl:inline text-xl lg:text-4xl font-bold"
						>
							<Image 
								src={theme === "light" ? "/icons/helixicon_post.png" : "/icons/helix_icon_black.png"} 
								alt="Helix DAO header icon"
								width="72"
								height="72"
								placeholder="blur"
								blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(62, 62))}`}
							/>
						</div>
					</div>
					<div className="hidden md:flex-1 md:flex md:space-x-5">
						<button 
							className={page === "dash" ? "font-semibold text-gray8 bg-gray4 p-0.5 px-1 rounded-md" : "text-gray6 p-0.5"}
							onClick={() => setPage("dash")}
						>
							Dashboard
						</button>
						<button
							onClick={() => setPage("staking")}
							className={page === "staking" ? "font-semibold text-gray8 bg-gray4 p-0.5 px-1 rounded-md" : "text-gray6 p-0.5"}
						>
							Staking
						</button>
						<button
							onClick={() => setPage("bonds")}
							className={page === "bonds" ? "font-semibold text-gray8 bg-gray4 p-0.5 px-1 rounded-md" : "text-gray6 p-0.5"}
						>
							Bonds
						</button>
						<button
							onClick={() => setPage("governance")}
							className={page === "governance" ? "font-semibold text-gray8 bg-gray4 p-0.5 rounded-md" : "text-gray6 p-0.5"}
						>
							Governance
						</button>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className='bg- rounded-md p-2 inline-flex items-center justify-center text-gray-white hover:bg-gray-900 focus:outline-none'>
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Popover.Group as="nav" className='hidden divide-gray-600 md:flex space-x-6'>
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
								<ConnectionButton/>
								<WalletButton/>
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