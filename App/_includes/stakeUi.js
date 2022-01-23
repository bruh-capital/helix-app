import { useState, useMemo, useEffect } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

// TODO(@millionz): make sure that the stats can be passed in as props
// Add color changes for stat values
// Add smartmath/input errors for invalid stake/unstake values
// Add current staked balance
export default function StakeInterface(props) {
	// Reapop things
	const { notifications, dismissNotification } = useNotifications();

	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState(0);

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

	return(
		<>
			<NotificationsSystem 
					notifications={notifications}
					dismissNotification={(id) => dismissNotification(id)}
					theme={atalhoTheme}
			/>
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
						
						<div className="grid grid-rows-1 grid-flow-col gap-4">
						<input 
							type="number"
							placeholder="Unstake Amount"
							className="input input-bordered text-black"
							value={stakeAmount}
							onChange={(e) => setStakeAmount(e.target.value)}
						/>
						<button 
							className="btn btn-primary"
							onClick={() => {operation ===  "Stake" ? stakeToken(stakeAmount) : unstakeToken(stakeAmount)}}
						>Enter</button>
						</div>
						<div className="bg-gray4 grid grid-cols-2 grid-rows-1 justify-center justify-self-center content-center rounded-md mt-3 p-1 w-1/3">
							<button
								onClick={() => setOperation("Stake")}
								className={
									operation === "Stake" ? 
									"bg-purple-600 px-4 py-1 rounded-md justify-self-start" : "bg-white text-gray7 px-4 py-1 rounded-md justify-self-start"
								}
							>Stake</button>
							<button
								onClick={() => setOperation("Unstake")}
								className={
									operation === "Unstake" ? 
									"bg-purple-600 px-2 py-1 rounded-md justify-self-end" : "bg-white text-gray7 px-2 py-1 rounded-md justify-self-end"
								}
							>Unstake</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}