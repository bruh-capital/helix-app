import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext, useEffect } from 'react';
import helixContext from '@context/helixContext';

// TODO(Milly):
// - add extra pretty data to modal dialogue
// - fix table spacing
// - pass in token icons
// - replace temp data for getpageProps
// - mobile scaling for bonds page
// - theme appropriate colors
export default function BondModalButton(props) {
	const [ isOpen, setIsOpen] = useState(false);
	const [ bondAmount, setBondAmount ] = useState(null);
	const [ expiration, setExpiration] = useState(0);
	const {client} = useContext(helixContext);
	const [market, setMarket] = useState();
	const [amountDue, setAmountDue] = useState(0);

	useEffect(async ()=>{
		if(client && client.getBondMarketInfo){
			let bond_market = await client.getBondMarketInfo(props.tokenAddress);
			console.log(bond_market);
			setMarket(bond_market);
		}
	}, [!!client]);

	useEffect(()=>{
		setAmountDue(bondAmount / Math.pow(1 + (market.interestRate.toNumber()/ 1000), expiration));
	}, [bondAmount, expiration])

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="px-4 py-2 text-sm font-medium bg-[#40444F] dark:bg-[#3A3D45] rounded-md dark:hover:bg-zinc-600"
			>
				Bond
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#D9D8E2] dark:bg-[#191B1F] shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-[#272629] dark:text-white"
								>
									Bond
								</Dialog.Title>
								<div className="mt-2 flex flex-col">
									<div className="flex flex-row rounded-lg mx-10 md:mx-16 p-4 mb-4 bg-[#C0C0C0] dark:bg-[#212429]">
										<input
											className="border-0 bg-transparent text-xl w-full outline-none"
											type="number"
											placeholder="Helix Received at Maturity"
											value={bondAmount || ""}
											onChange={(e) => setBondAmount(e.target.value)}
										/>
									</div>
									<div className="flex flex-row rounded-lg mx-10 md:mx-16 p-4 mb-4 bg-[#C0C0C0] dark:bg-[#212429]">
										<input
											className="border-0 bg-transparent text-xl w-full outline-none"
											type="number"
											placeholder="Maturity in weeks"
											value={expiration || ""}
											onChange={(e) => setExpiration(e.target.value)}
										/>
									</div>
									<div className='flex flex-row ml-16 mb-2 text-zinc-400 text-sm'>
										Amount Due: {amountDue}
									</div>
									<button
										className="rounded-lg py-2 mx-10 md:mx-16 p-8 font-bold text-lg mb-10 bg-[#C0C0C0] dark:bg-[#212429] text-[#696B70]"
										onClick={() => {props.tokenName == "SOL" ? client.solBond(bondAmount, expiration, props.network) : client.splBond(bondAmount, expiration, props.tokenAddress, props.tokenName, props.network, props.decimals)}}
									>
										Mint!	
									</button>
								</div>
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={closeModal}
								>
									Close!
								</button>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
