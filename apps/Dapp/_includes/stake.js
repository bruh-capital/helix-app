import { useContext, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";

import UserDataContext from "@context/userDataContext";

export default function Stake(props) {
	const [ uiFunction, setUiFunction ] = useState(null);	
	const [ amount, setAmount ] = useState(0.0);
	const { userData, setUserData } = useContext(UserDataContext);

	return(
		<div className="h-screen -mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="flex flex-col sm:px-0 md:px-16 lg:px-50 xl:px-70 2xl:px-96 gap-y-8">
				<div className="flex flex-row justify-items-start rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]">
					<div className="rounded-xl p-2 m-2 bg-[#EEEEEE] bg-opacity-60 dark:bg-[#383838]">
						<InformationCircleIcon className="h-5 w-5"/>
					</div>
					<div className="text-sx md:text-md font-medium text-[#606060] dark:text-[#7C849A] my-auto">
						Note: The "Configure" transaction is only needed when interacting for the first time.
					</div>
				</div>
				<div className="flex flex-col rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]" >
					<div className="flex font-medium pt-10 px-10 md:px-16 text-[#435178] dark:text-[#7C849A]">
						Your Staked HLX
					</div>
					<div className="flex font-bold text-[#272629] dark:text-white px-10 md:px-16 text-3xl md:text-6xl">
						{userData?.stakedHLX || "N/A"}
					</div>
					<div className="flex flex-row self-center justify-around font-bold text-xl my-8 gap-x-8 md:gap-x-16">
						<button
							className={
								"rounded-lg px-4 py-2 " + (uiFunction === "stake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70]")
							}
							onClick={() => setUiFunction("stake")}
						>
							Stake
						</button>
						<button
							className={
								"rounded-lg px-4 py-2" + (uiFunction === "unstake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70]")
							}
							onClick={() => setUiFunction("unstake")}
						>Unstake</button>
					</div>
					<div className="flex flex-row rounded-lg mx-10 md:mx-16 p-8 bg-[#C0C0C0] dark:bg-[#212429]">
							<input
								className="border-0 bg-transparent text-2xl w-full outline-none"
								type="number"
								placeholder={uiFunction === "stake" ? "Stake Amount" : "Unstake Amount"}
								value={amount || ""}
								onChange={(e) => setAmount(e.target.value)}
							/>
					</div>
					<button
						className="rounded-xl py-2"
					>
						{uiFunction === "stake" ? "Stake" : "Unstake"}
					</button>
				</div>
			</div>
		</div>
	);
}