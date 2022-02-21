import { Fragment, useState, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

// Context
import RpcUrlContext from "@context/rpcUrlContext";
import MultiSigContext from "@context/multiSigContext";

const networks = [
	{
		value: 'mainnet',
		label: 'Mainnet',
		mSigAddr: '',
		cluster: 'https://api.mainnet-beta.solana.com'
	},
	{ 
		value: 'testnet',
		label: 'Testnet',
		mSigAddr: '',
		cluster: 'https://api.testnet.solana.com'
	},
	{ 
		value: 'devnet',
		label: 'Devnet',
		mSigAddr: '2hhSux633AHhbg91viSibSnUSjdzi5dsbyypWjG5Sr2b',
		cluster: 'https://api.devnet.solana.com'
	},
	{ 
		value: 'localnet',
		label: 'Localnet',
		mSigAddr: '',
		cluster: 'http://localhost:8899'
	},
];

// FIXME(@millionz) - text size for this is so fucked bro why
// TODO(@millionz) - add notifications for network changes
export default function ConnectionButton(props) {
	const { setRpcUrl } = useContext(RpcUrlContext);
	const { setMultiSigAddr } = useContext(MultiSigContext);
	const [ selected, setSelected ] = useState(networks[2]);

	return (
		<Listbox 
			value={selected} 
			onChange={(value) => {
				setSelected(value);
				setRpcUrl(value.cluster);
				setMultiSigAddr(value.mSigAddr);
			}}
		>
			<div>
				<Listbox.Button 
					className="text-center py-3.5 p-6 h-full text-black font-bold w-auto bg-gray4 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-purple-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
					style={{boxShadow: "0px 0px 10px rgba(256, 256, 256, 1)"}}
				>
					<span className="block truncate">Network ⚙️</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-50 w-36 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{networks.map((network, index) => (
						<Listbox.Option
							key={index}
							className={({ active }) =>
							`${active ? 'text-purple-900 bg-purple-100' : 'text-gray-900'}
									cursor-default select-none relative py-2 pl-10 pr-4`
							}
							value={network}
						>
							{({ selected, active }) => (
							<>
								<span
								className={`${
									selected ? 'font-medium' : 'font-normal'
								} block truncate`}
								>
								{network.label}
								</span>
								{selected ? (
								<span
									className={`${
									active ? 'text-purple-600' : 'text-purple-600'
									}
										absolute inset-y-0 left-0 flex items-center pl-3`}
								>
									<CheckIcon className="w-5 h-5" aria-hidden="true" />
								</span>
								) : null}
							</>
							)}
						</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
  }