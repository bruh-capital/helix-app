import { useState, useMemo } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

export default function StakeInterface(props) {
	// Reapop things
	const { notifications, dissmissNotification } = useNotifications();

	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState();

	const {
		stakeToken,
		unstakeToken,
		changeLockupPeriod,
	} = HelixWrapper();

	return(
		<>
			<NotificationsSystem 
					notifications={notifications}
					dismissNotification={(id) => dissmissNotification(id)}
					theme={atalhoTheme}
			/>
			<div className="grid justify-items-center justify-center w-full grid-cols-2">
				<div className="card flex justify-self-center bg-white w-2/3 py-10 mt-10 divide-y divide-gray-300">
					<h3 className="font-semibold text-2xl text-gray8">APY</h3>
					<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secPink to-primBlue">XXXXXX.XX%</span>
				</div>
				<div className="card flex justify-self-center bg-white w-2/3 py-10 mt-10 divide-y divide-gray-300">
					<h3 className="font-semibold text-2xl text-gray8">TVL</h3>
					<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secPink to-primBlue">XXXXX</span>
				</div>
				<div className="card flex justify-center col-span-2 mt-10 bg-white p-10 w-2/3">
					<h3 className="font-semibold text-gray8">{operation}</h3>
					<div className="card-body">
						<div className="bg-gray4 rounded-md space-x-2">
							<button
								onClick={() => setOperation("Stake")}
								className={
									operation === "Stake" ? 
									"tab tab-active" : "tab"
								}
							>Stake</button>
							<button
								onClick={() => setOperation("Unstake")}
								className={
									operation === "Unstake" ? 
									"tab tab-active" : "tab"
								}
							>Unstake</button>
						</div>
						<div className="grid grid-rows-1 grid-flow-col gap-4">
						{
							operation ===  "Stake" ? 
							(
								<>
									<input
										type="number"
										placeholder="Stake Amount"
										className="input input-bordered text-black"
										value={stakeAmount}
										onChange={(e) => setStakeAmount(e.target.value)}
									/>
									<button 
										className="btn btn-primary"
										onClick={() => stakeToken(stakeAmount)}
									>Enter</button>
								</>
							)
							: (
								<>
									<input 
										type="number"
										placeholder="Unstake Amount"
										className="input input-bordered text-black"
										value={stakeAmount}
										onChange={(e) => setStakeAmount(e.target.value)}
									/>
									<button 
										className="btn btn-primary"
										onClick={() => unstakeToken(stakeAmount)}
									>Enter</button>
								</>
							)
						}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}