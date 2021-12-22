import { useState } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function BondInterface() {
	const [bondAmount, setBondAmount] = useState(0);
	const [bondAsset, setBondAsset] = useState("");

	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond
	} = HelixWrapper();

	return (
		<div className="card flex justify-center bg-white p-10 mt-10">
			<div className="card-body">
				<h2 className="card-title text-4xl font-bold text-black pb-5">Bond</h2>
				<div className="grid grid-rows-1 grid-flow-col gap-4">
					<input
						type="number"
						placeholder="Sol amount"
						className="input input-bordered"
						value={bondAmount}
						onChange={(e) => setBondAmount(e.target.value)}
					/>
					<button
						className="btn btn-primary"
						onClick={() => makeBond(bondAmount)}
					>Mint</button>
				</div>
				<div className="divider"></div>
				<button 
					className="btn btn-primary"
					onClick={() => redeemBond()}
				>
					Redeem
				</button>
			</div>
		</div>
	);
} 