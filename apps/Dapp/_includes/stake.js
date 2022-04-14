import { useContext, useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import { InformationCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

import HelixClientCtx from "@context/clients/twstClientCtx";

export default function Stake(props) {
	const wallet = useConnectedWallet();
	const goki = useWalletKit();

	const { helixClient } = useContext(HelixClientCtx);

	// state
	const [ uiFunction, setUiFunction ] = useState("stake");	
	const [ amount, setAmount ] = useState(null);
	const [ lockupPeriod, setLockupPeriod] = useState(0);
	const [ stakedBalance, setStakedBalance ] = useState();

	const [userVault, setUserVault] = useState();
	useEffect(async ()=>{
		if(wallet?.connected && helixClient){
			setUserVault(await helixClient.FetchUserVault());
		}
	},[wallet, helixClient]);

	const [protocolData, setProtocolData] = useState();
	useEffect(async ()=>{
		if(helixClient && helixClient.protocolDataAccount){
			setProtocolData(await helixClient.FetchProtocolData())
		}
	},[helixClient])

	return(
		<div className="-mt-24 h-screen content-center items-center pt-32 md:pt-36 pb-24">
			<div className="flex flex-col mx-8 sm:mx-auto sm:w-3/4 md:w-1/2 gap-y-8">
				<div className="hidden p-2 md:flex md:flex-row justify-items-start rounded-2xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838] w-full">
					<div className="rounded-lg p-1 m-2 bg-[rgb(238,238,238)] bg-opacity-60 dark:bg-[#343A45]">
						<InformationCircleIcon className="h-4 w-4"/>
					</div>
					<div className="text-sx md:text-medium font-medium text-[#606060] dark:text-[#7C849A] my-auto whitespace-nowrap truncate text-sm">
						Note: The "Create Vault" transaction is only needed when interacting for the first time.
					</div>
				</div>
				<div className="flex flex-col rounded-2xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]" >
					<div className="flex flex-row mb-6 justify-around">
						<div>
							<div className="flex font-medium pt-10 px-10 md:px-16 text-[#435178] dark:text-[#7C849A] text-ellipsis">
								Staking APY
							</div>
							<div className="flex font-bold text-[#272629] dark:text-white px-10 md:px-16 text-3xl md:text-6xl text-ellipsis whitespace-nowrap">
								{typeof protocolData?.rewardRate?.toNumber() == "number" ? protocolData?.rewardRate.toLocaleString(undefined, {maximumFractionDigits: 2}) + "%" : "N/A"}
							</div>
						</div>
						<div>
							<div className="flex font-medium pt-10 px-10 md:px-16 text-[#435178] dark:text-[#7C849A] text-ellipsis whitespace-nowrap">
								Your Staked HLX
							</div>
							<div className="flex font-bold text-[#272629] dark:text-white px-10 md:px-16 text-3xl md:text-6xl text-ellipsis whitespace-nowrap">
								{typeof stakedBalance == "number" ? stakedBalance : "N/A"}
							</div>
						</div>
					</div>
					<div className="flex flex-row self-center justify-around font-bold text-lg md:text-xl my-4 gap-x-8 md:gap-x-16">
						<button
							className={
								"rounded-lg px-4 py-2 " + (uiFunction === "stake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70] hover:text-[#343A45] dark:hover:text-gray-300")
							}
							onClick={() => setUiFunction("stake")}
						>
							Stake
						</button>
						<button
							className={
								"rounded-lg px-2 md:px-4 py-1 md:py-2 " + (uiFunction === "unstake" ?
									"bg-[#343A45] text-white" : "bg-transparent text-[#696B70] hover:text-[#343A45] dark:hover:text-gray-300")
							}
							onClick={() => setUiFunction("unstake")}
						>
							Unstake
						</button>
					</div>
					<div className={"flex flex-row rounded-lg mx-8 md:mx-16 p-3 mb-4 bg-[#C0C0C0] dark:bg-[#212429] " + (!wallet?.connected && " animate-pulse h-12")}>
						{wallet?.connected && (
							<>
							<div className="flex flex-col justify-items-start justify-start flex-none">
								<div className="flex bg-[#333A45] rounded-lg flex-none p-1 mr-auto justify-start">
									<div className="pt-1">
										<Image
											src = {"/2d/2d_logo4.png"}
											height = {20}
											width = {12}
											layout="fixed"
											priority={true}
										/>
									</div>
									<span className="font-semibold text-sm text-white pt-1 pl-1 leading-relaxed">HLX</span>
								</div>
								<div className="text-xs text-[#435178] dark:text-[#7C849A] whitespace-nowrap mt-1">
									{"Total: " + (protocolData ? amount/(protocolData?.shareRatio?.toNumber()/1000) : "0.00")}
								</div>
							</div>
							<input
								className="border-0 bg-transparent font-normal text-lg w-full outline-none text-right text-[#435178] dark:text-[#7C849A]"
								type="number"
								placeholder="0.00"
								value={amount || ""}
								onChange={(e) => setAmount(e.target.value)}
							/> 
							</>
						)}
					</div>
					<button
						className="rounded-lg py-2 mx-8 md:mx-16 p-8 font-bold text-lg mb-10 bg-[#C0C0C0] dark:bg-[#212429] text-[#696B70] 
						dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
						onClick={() => {
							if (wallet?.connected && userVault) {
								uiFunction == "stake" ? helixClient.Stake(amount) : helixClient.Unstake(amount);
							} else if (wallet?.connected && !userVault) {
								helixClient.InitializeUserVault();
							} else {
								goki.connect();
							}
						}}
					>
						{
							wallet?.connected && userVault ?
							(uiFunction === "stake" ? "Stake" : "Unstake") :
							(wallet?.connected && !userVault ? "Create Vault" : "Connect Wallet")
						}
					</button>
					{
						uiFunction === "stake" && (
							<>
								<div className={"flex flex-row rounded-lg mx-8 md:mx-16 p-4 mb-4 bg-[#C0C0C0] dark:bg-[#212429] " + (!wallet?.connected && " h-12 animate-pulse")}>
									{wallet?.connected && (
										<input
											className="border-0 bg-transparent text-lg w-full outline-none text-[#435178] dark:text-[#7C849A]"
											type="number"
											placeholder="Lockup Period (Weeks)"
											value={lockupPeriod || ""}
											onChange={(e) => setLockupPeriod(e.target.value)}
										/>
									)}
								</div>
								<button
									className="rounded-lg py-2 mx-8 md:mx-16 p-8 font-bold text-lg mb-10 bg-[#C0C0C0] dark:bg-[#212429] text-[#696B70]
									dark:hover:text-gray-300 dark:hover:bg-[#343A45] dark:hover:border-[#BABABA]"
									onClick={() => {
										if(wallet?.connected && userVault){
											helixClient.ChangeLockup(lockupPeriod);
										} else if (wallet?.connected && !userVault) {
											helixClient.InitializeUserVault();
										}
									}}
								>
									{wallet?.connected && userVault ? "Change" : wallet?.connected && !userVault ? "Create Vault" : "Connect Wallet"}
								</button>
							</>
						)
					}
				</div>
			</div>
		</div>
	);
}