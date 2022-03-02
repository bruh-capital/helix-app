import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Stat from "@includes/components/stat";
import { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

import { LightningBoltIcon} from "@heroicons/react/outline"
import HelixContext from "@context/helixContext";
import helixClient from 'helix-client';

export default function Dash(props) {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const endDate = new Date(1646110800000);

	const [idoAccount, setIdoAccount] = useState();
	const [idoAta, setIdoAta] = useState();

	const [amount, setAmount] = useState();

	const {client, setClient} = useContext(HelixContext);
	const wallet = useConnectedWallet();
	const goki = useWalletKit();
	const { walletProviderInfo, disconnect, providerMut, network, setNetwork } = useSolana();

	useEffect(()=>{
		if(wallet){
			setClient(new helixClient(wallet));
		}
	}, [!!wallet]);

	useEffect(async ()=>{
		console.log("setting accounts");
		if(client && client.fetchIdoAccount && client.fetchIdoAta){
			console.log("fetching accounts");
			const idoacc = await client.fetchIdoAccount();
			const idoata = await client.fetchIdoAta();
			console.log(idoacc);
			console.log(idoata);
			setIdoAccount();
			setIdoAta();
		}
	},[client && client.fetchIdoAccount && client.fetchIdoAta])

	useEffect(()=>{
		setInterval(()=>{
			const today = new Date();
			setDays(parseInt((endDate - today) / (86400000)));
			setHours(parseInt(Math.abs(endDate - today) / (14400000) % 24));
			setMinutes(parseInt(Math.abs(endDate.getTime() - today.getTime()) / (60000) % 60));
			setSeconds(parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60)) ;
		}, 1000);
	},[])

	return(
		<div className="grid grid-cols-1 place-items-center pb-16 absolute top-10 transparent w-full" >
			<div className="flex flex-col items-center h-full w-3/4 space-y-10 ">
				<div className="flex flex-col rounded-md bg-[#747474] bg-opacity-50 place-content-center text-5xl text-center h-24 w-1/2 font-mono text-white">
					{days} : {hours} : {minutes} : {seconds}
				</div>
				<div className="rounded-md flex flex-row bg-[#F9F4F4] bg-opacity-50 h-24 pt-4 place-items-center w-3/4 px-24 py-4 ">
					<div className="grid grid-cols-1 w-3/4">
						<div>
							Read more about the token distribution in our Whitepaper
						</div>
					</div>
					<div className="mt-2 absolute right-5">
						<Image
								src = {"/idoassets/distributionpie.png"}
								height = {240}
								width = {600}
								layout="fixed"
								priority={true}
						/>
					</div>
				</div>
				<div className="rounded-md grid grid-cols-1 bg-[#F9F4F4] bg-opacity-50 h-80 pt-4 place-items-center w-3/4 px-24 py-4">
						<div className="flex flex-row h-10 justify-center ">
							<Stat
								statName="Amount Deposited"
								statValue={20}
							/>
							<Stat
								statName="Total Amount Deposited"
								statValue={200000}
							/>
						</div>
						<div className="flex flex-row rounded-md w-3/4 h-16 bg-[#F9F4F4] bg-opacity-50 px-6 place-items-center">
							{wallet?.connected && (
								<>
								<div className="flex flex-row rounded-lg h-10 w-24 place-items-center">
								<div className="ml-2 mt-2">
											<Image
													src = {"/2d/2d_logo4.png"}
													height = {26}
													width = {16}
													layout="fixed"
													priority={true}
											/>
										</div>
										<span className="font-bold text-sm text-white pl-2 leading-relaxed">HLX</span>
								</div>
								<input
									className="border-0 bg-transparent font-normal text-lg w-full outline-none text-right text-black font-bold font-family-mono"
									type="number"
									placeholder={"Enter Amount"}
									value={amount || ""}
									onChange={(e) => setAmount(e.target.value)}
								/> 
								</>
							)}
						</div>
						{wallet?.connected?
							<div className="flex flex-row space-x-32 justify-center place-items-center w-3/4">
								<button 
									className="text-[#3b3b3b] border-2 border-[#8C8C8C] w-1/2 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25 py-4 hover:bg-[#5015a3] hover:border-[#5015a3] hover:bg-opacity-50 hover:text-white">
									Deposit
								</button>
								
								<button 
									className="text-[#3b3b3b] border-2 border-[#8C8C8C] w-1/2 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25 py-4 hover:bg-[#5015a3] hover:border-[#5015a3] hover:bg-opacity-50 hover:text-white">
									Withdraw
								</button>
							</div>:
							<button 
									className="flex flex-row items-center justify-around text-md font-medium bg-[#C8C7CA] px-2 md:px-3 py-1 md:py-2 rounded-md"
									onClick={() => goki.connect()}
								>
									<span>Connect Wallet</span>
									<LightningBoltIcon className="h-4 w-4 pl-1 md:h-6 md:w-6" />
								</button>
							}
					</div>
			</div>
			
		</div>
	);
}