import { useState } from "react";
import { Stake, Unstake } from "@baseutils/baseContractUtils";
import { useWallet } from "@solana/wallet-adapter-react";

export default function StakeInterface(props) {
	// State Stuff
	const [ operation, setOperation ] = useState("Stake");
	const [ amount, setAmount ] = useState(0);

	const wallet = useWallet();

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
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<button className="btn btn-primary">Enter</button>
						</>
					)
					: (
						<>
							<input 
								type="number"
								placeholder="unstake amount"
								className="input input-bordered"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<button 
								className="btn btn-primary"
								//onClick={() => Unstake(wallet, )}
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
	);
}