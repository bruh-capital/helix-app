import { useState } from "react";

export default function StakeInterface(props) {
	const [operation, setOperation] = useState("Stake");

	return(
		<div className="card flex justify-center bg-white p-10">
			<div className="card-body">
				<h2 className="card-title text-black">{operation}</h2>
				{
					operation ===  "Stake" ? 
					(
						<div className="grid grid-rows-1 grid-flow-col gap-4">
							<input
								type="number"
								placeholder="stake amount"
								className="input input-bordered"
							/>
							<button className="btn btn-primary">Enter</button>
						</div>
					)
					: (
						<div className="grid grid-rows-1 grid-flow-col gap-4">
							<input 
								type="number"
								placeholder="unstake amount"
								className="input input-bordered"
							/>
							<button className="btn btn-primary">Enter</button>
						</div>
					)
				}
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