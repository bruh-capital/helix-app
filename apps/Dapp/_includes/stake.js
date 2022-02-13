import { useContext, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";

import UserDataContext from "@context/userDataContext";

export default function Stake(props) {
	const [ uiFunction, setUiFunction ] = useState("stake");	
	const { userData, setUserData } = useContext(UserDataContext);

	return(
		<div className="h-screen -mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="flex flex-col md:px-24 xl:px-32 2xl:px-52 gap-y-8">
				<div className="flex flex-row justify-items-start rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]">
					<div className="rounded-xl p-2 m-2 bg-[#EEEEEE] bg-opacity-60 dark:bg-[#383838]">
						<InformationCircleIcon className="h-5 w-5"/>
					</div>
					<div className="font-medium text-[#606060] dark:text-[#7C849A] my-auto">
						Note: The "Configure" transaction is only needed when interacting for the first time.
					</div>
				</div>
				<div className="flex flex-col rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]" >
					<div className="flex font-medium pt-10 px-10 text-[#435178] dark:text-[#7C849A]">
						Your Staked HLX
					</div>
					<div className="flex font-bold text-[#272629] dark:text-white px-10 text-3xl md:text-6xl">
						{userData?.stakedHLX || "N/A"}
					</div>
					<div className="flex flex-row justify-around font-bold text-xl px-40 md:px-50 lg:px-60 xl:px-70">
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
								"rounded-lg px-4 py-2 " + (uiFunction === "unstake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70]")
							}
							onClick={() => setUiFunction("unstake")}
						>Unstake</button>
					</div>
				</div>
			</div>
		</div>
	);
}