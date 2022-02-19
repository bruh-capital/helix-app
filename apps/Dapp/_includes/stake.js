import { useContext, useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import { InformationCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import UserDataContext from "@context/userDataContext";
import { useWalletKit } from "@gokiprotocol/walletkit";
import helixContext from "@context/helixContext";

export default function Stake(props) {
	const { theme, setTheme } = useTheme();
	const wallet = useWalletKit();
	const [ uiFunction, setUiFunction ] = useState("stake");	
	const [ amount, setAmount ] = useState(null);
	const [ lockupPeriod, setLockupPeriod] = useState(0);
	const { userData, setData } = useContext(UserDataContext);
	const [stakedBalance, setStakedBalance] = useState();
	const {client} = useContext(helixContext);

	const [protocolData, setProtocolData] = useState();

	useEffect(async ()=>{
		if(client && client.getUserVault){
			let userVault = await client.getUserVault();
			if(userVault){
				setData(userVault);
				setStakedBalance(userVault.stakeBalance.toNumber())	
			}
		}

		if(client && client.getProtocolData){
			let protocData = await client.getProtocolData();
			setProtocolData(protocData);
		}
	}, [client]);

	return(
		<div className="-mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="flex flex-col mx-8 gap-y-8">
				<div className="flex flex-row justify-items-start rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838] w-full">
					<div className="rounded-xl p-2 m-2 bg-[#EEEEEE] bg-opacity-60 dark:bg-[#343A45]">
						<InformationCircleIcon className="h-5 w-5"/>
					</div>
					<div className="text-sx md:text-medium font-medium text-[#606060] dark:text-[#7C849A] my-auto whitespace-nowrap truncate text-sm">
						Note: The "Configure" transaction is only needed when interacting for the first time.
					</div>
				</div>


				<div className="flex flex-col rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]" >
					<div className="flex font-medium pt-10 px-10 md:px-16 text-[#435178] dark:text-[#7C849A]">
						Your Staked sHLX
					</div>
					<div className="flex font-bold text-[#272629] dark:text-white px-10 md:px-16 text-3xl md:text-6xl">
						{typeof stakedBalance == "number" ? stakedBalance : "N/A"}
					</div>
					<div className="flex flex-row self-center justify-around font-bold text-lg md:text-xl my-4 gap-x-8 md:gap-x-16">
						<button
							className={
								"rounded-lg px-4 py-2 " + (uiFunction === "stake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70] hover:text-gray-300")
							}
							onClick={() => setUiFunction("stake")}
						>
							Stake
						</button>
						<button
							className={
								"rounded-lg px-4 py-2 " + (uiFunction === "unstake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70] dark:hover: hover:text-gray-300")
							}
							onClick={() => setUiFunction("unstake")}
						>Unstake</button>
					</div>
					<div className="flex flex-col rounded-lg mx-6 md:mx-16 p-3 mb-4 bg-[#C0C0C0] dark:bg-[#212429]">
						<div className="grid grid-cols-2 mb-2">
							<Image
								src = {"/2d/" + (theme == "light"? "2d_logo3.png" : "2d_logo4.png")}
								height = {30}
								width = {18}
								layout="fixed"
								priority={true}
							/>
							<input
								className="border-0 bg-transparent text-xl w-full outline-none text-right"
								type="number"
								placeholder={uiFunction === "stake" ? "Stake Amount" : "Unstake Amount"}
								value={amount || ""}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</div>
						<div className="text-xs text-slate-500">
							Total: {protocolData ? amount/(protocolData.shareRatio.toNumber()/1000) : null}
						</div>

					</div>
					{/* needs some UX cleanups like adding the connect button directly here...*/}
					<button
						className="rounded-lg py-2 mx-10 md:mx-16 p-8 font-bold text-lg mb-10 bg-[#C0C0C0] dark:bg-[#212429] text-[#696B70] 
						dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
						onClick={() => {
								if (wallet) {
									uiFunction == "stake" ? client.stakeToken(amount) : client.unstakeToken(amount);
								} else {
									// FIXME(milly): Add nice lil reapop notifs here
									console.log("Please Connect Your Wallet")
								}
							}
						}
					>
						{uiFunction === "stake" ? "Stake" : "Unstake"}
					</button>
					<div className="flex flex-row rounded-lg mx-10 md:mx-16 p-4 mb-4 bg-[#C0C0C0] dark:bg-[#212429]">
							<input
								className="border-0 bg-transparent text-xl w-full outline-none"
								type="number"
								placeholder={"Change Lockup Period"}
								value={lockupPeriod || ""}
								onChange={(e) => setLockupPeriod(e.target.value)}
							/>
					</div>
					<button
						className="rounded-lg py-2 mx-10 md:mx-16 p-8 font-bold text-lg mb-10 bg-[#C0C0C0] dark:bg-[#212429] text-[#696B70]
						dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
						onClick={() => {
							if(client && client.ChangeLockup){
								client.ChangeLockup(lockupPeriod);
							}
						}
						}
					>
						Change
					</button>
				</div>
				<div className="grid grid-cols-2 place-items-center">
					<div className="grid grid-col place-items-center align-middle rounded-xl justify-center bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838] w-7/8">
						<button
								className="rounded-lg py-4 p-8 mx-10 md:mx-8 font-bold text-lg m-4 bg-[#C0C0C0] dark:bg-[#212429] dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
								onClick={() => {client.createVault()}}
						>
							Create Vault
						</button>
					</div>

					<div className="grid grid-col place-items-center align-middle rounded-xl justify-center bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838] w-7/8">
						<button
							className="rounded-lg py-4 p-8 mx-10 md:mx-8 font-bold text-lg m-4 bg-[#C0C0C0] dark:bg-[#212429] dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
							onClick={() => {client.closeVault()}}
						>
							Delete Vault
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}