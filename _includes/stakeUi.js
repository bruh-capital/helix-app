import { useState, useMemo } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function StakeInterface(props) {
	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ stakeAmount, setStakeAmount ] = useState(0);
	const [ assetAmount, setAssetAmount ] = useState(0);

	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond 
	} = HelixWrapper();

	return(
		<div className="card flex justify-center bg-white p-10">
			<div className="card-body">
				<h2 className="card-title text-black">{operation}</h2>
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

			<div className="tabs tabs-boxed">
				<button
					onClick={() => createUserAta()}
					className={
						"tab tab-active"
					}
				>Create Account</button>
				<button
					onClick={() => createVault()}
					className={
						"tab tab-active"
					}
				>Create Vault</button>
			</div>
			<>
				<input 
					type="number"
					placeholder="asset amount"
					className="input input-bordered"
					value={assetAmount}
					onChange={(e) => setAssetAmount(e.target.value)}
				/>
			</>
			<div className="tabs tabs-boxed">
				
			<button
					onClick={() => makeBond(assetAmount)}
					className={
						"tab tab-active"
					}
				>Asset for bond</button>
				<button
					onClick={() => redeemBond()}
					className={
						"tab tab-active"
					}
				>Redeem Bonds</button>
			</div>
		</div>
	);
}