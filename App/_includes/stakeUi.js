import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import HelixWrapper from "@hooks/baseLayerHooks";

// TODO(@millionz): make sure that the stats can be passed in as props
// Add color changes for stat values
// Add smartmath/input errors for invalid stake/unstake values
// Add current staked balance
export default function StakeInterface(props) {
	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState();
	const [ unstakeAmount, setUnstakeAmount ] = useState();

	const {
		helixClient,
		stakeToken,
		unstakeToken,
		changeLockupPeriod,
		getUserVault,
		getProtocolData,
	} = HelixWrapper();

	const [userVault, setUserVault] = useState();
	const [protocData, setProtocData] = useState();

	useEffect(async ()=>{
		if (helixClient != undefined){
			setUserVault(await getUserVault());
			setProtocData(await getProtocolData());
		}
	}, [helixClient]);

	const [lockupPeriod, setLockupPeriod] = useState();

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	return(
		<div className="grid justify-items-center justify-center w-full grid-cols-2">
			<div className="card flex justify-self-center bg-white w-2/3 py-8 px-6 mt-10 divide-gray-300 place-items-center place-content-center">
				<h3 className="font-semibold text-left text-2xl text-gray8">APY</h3>
				{/* <span className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-secPink to-primBlue">XXXXXX.XX%</span> */}
				<span className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-secPink to-primBlue">{protocData ? (protocData.rewardRate.toNumber()/10) + "%" : "XXX.XX%"}</span>
				<span className="text-sm opacity-50 text-green-500">↗︎ XXX%</span>
			</div>
			<div className="card flex justify-self-center bg-white w-2/3 py-8 px-6 mt-10 divide-gray-300 place-items-center place-content-center">
				<h3 className="font-semibold text-left text-2xl text-gray8">TVL</h3>
				<span className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-secPink to-primBlue">{(userVault && protocData) ? userVault.stakeBalance.toNumber() * protocData.shareRatio.toNumber()/1000 : "XXXXXXXX"}</span>
				<span className="text-sm opacity-50 text-green-500">↗︎ $1234 (2%)</span>
			</div>
			<div className="card flex justify-center col-span-2 mt-10 bg-white p-10 w-2/3">
				<h3 className="font-semibold text-4xl text-gray8">{operation}</h3>
				<div className="card-body content-center text-center justify-center">
					<Tab.Group
						defaultIndex={0}
						onChange={(index) => {
							index === 0 ? setOperation("Stake") : setOperation("Unstake");
						}}
					>
						<Tab.Panels>
							<Tab.Panel>
								<div className="grid grid-rows-2 grid-flow-col">
								<div className="grid grid-rows-1 grid-flow-col gap-4 my-2">
									<input
										type="number"
										placeholder="Stake Amount"
										className="input input-bordered text-black"
										value={stakeAmount || ''}
										onChange={(e) => setStakeAmount(e.target.value)}
									/>
									<button
										className="btn btn-primary"
										onClick={() => stakeToken(unstakeAmount)}
									>Enter</button>
								</div>
								<div className="grid grid-rows-1 grid-flow-col gap-4 my-2">
									<input 
										type="number"
										placeholder="Lockup period in weeks"
										className="input input-bordered text-black"
										value={lockupPeriod || ''}
										onChange={(e) => setLockupPeriod(e.target.value)}
									/>
									<button
										className="btn btn-primary"
										onClick={() => changeLockupPeriod(lockupPeriod)}
									>Change Lockup</button>
								</div>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="grid grid-rows-1 grid-flow-col my-2 gap-4">
									<input
										type="number"
										placeholder="Unstake Amount"
										className="input input-bordered text-black"
										value={unstakeAmount || ''}
										onChange={(e) => setUnstakeAmount(e.target.value)}
									/>
									<button
										className="btn btn-primary"
										onClick={() => unstakeToken(stakeAmount)}
									>
										Enter
									</button>
								</div>
							</Tab.Panel>
						</Tab.Panels>
						<Tab.List className="flex p-1 space-x-1 my-2 bg-purple-100 rounded-md">
							<Tab 
								className={({ selected }) =>
									classNames(
									'w-full py-2.5 text-sm leading-5 font-medium text-gray8 rounded-lg',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
									selected && 'bg-white shadow',
								)}
							>Stake</Tab>
							<Tab
								className={({ selected }) =>
									classNames(
									'w-full py-2.5 text-sm leading-5 font-medium text-gray8 rounded-lg',
									'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
									selected && 'bg-white shadow',
								)}
							>Unstake</Tab>
						</Tab.List>
					</Tab.Group>
				</div>
			</div>
		</div>
	);
}