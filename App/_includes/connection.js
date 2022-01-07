import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, AdjustmentsIcon} from "@heroicons/react/outline";
import mainContext from "@context/mainContext"; 

const networks = [
	{ value: 'mainnet', label: 'Mainnet' },
	{ value: 'testnet', label: 'Testnet' },
	{ value: 'devnet', label: 'Devnet' },
	{ value: 'localnet', label: 'Localnet' },
];

export default function ConnectionButton(props) {
	const [selected, setSelected] = useState(networks[2]);
  
	return (
		<Listbox value={selected} onChange={setSelected}>
			<Listbox.Button className="text-center py-3 p-6 text-black font-bold w-auto bg-white rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-purple-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
			  <span className="block truncate">Network ⚙️</span>
			</Listbox.Button>
			<Transition
			  as={Fragment}
			  leave="transition ease-in duration-100"
			  leaveFrom="opacity-100"
			  leaveTo="opacity-0"
			>
			  <Listbox.Options className="absolute z-50 w-36 py-1 ml-24 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
				{networks.map((network, index) => (
				  <Listbox.Option
					key={index}
					className={({ active }) =>
					  `${active ? 'text-purple-900 bg-purple-100' : 'text-gray-900'}
							cursor-default select-none relative py-2 pl-10 pr-4`
					}
					value={network.value}
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
		</Listbox>
	)
  }