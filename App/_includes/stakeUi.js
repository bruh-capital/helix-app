import { useState, useMemo } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function StakeInterface(props) {
	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState(0);

	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond 
	} = HelixWrapper();

	return(
		<>
			<div className="bg-white rounded-box py-5">
				<h3 className="font-bold text-black pb-2">User Accounts</h3>
				<button
					className="btn btn-primary mx-2"
					onClick={() => createUserAta()}
				>Create Account</button>
				<button
					className="btn btn-primary mx-2"
					onClick={() => createVault()}
				>Create Vault</button>
			</div>
			<div className="card flex justify-center bg-white p-10 mt-10">
				<div className="card-body">
					<h2 className="card-title text-4xl font-bold text-black pb-5">{operation}</h2>
					<div className="grid grid-rows-1 grid-flow-col gap-4">
					{
						operation ===  "Stake" ? 
						(
							<>
								<input
									type="number"
									placeholder="stake amount"
									className="input input-bordered"
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
									placeholder="unstake amount"
									className="input input-bordered"
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
				<div className="tabs tabs-boxed">
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
			</div>
			
		</>
	);
}