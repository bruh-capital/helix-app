import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Stat from "@includes/components/stat";
import { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";

import { LightningBoltIcon} from "@heroicons/react/outline"
import HelixContext from "@context/helixContext";
import helixClient from "helix-clients";

export default function Dash(props) {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const endDate = new Date(1648785600000);

	const [idoAccount, setIdoAccount] = useState();
	const [idoAta, setIdoAta] = useState();

	const [amount, setAmount] = useState();

	const {client, setClient} = useContext(HelixContext);
	const wallet = useConnectedWallet();
	const goki = useWalletKit();
	const { walletProviderInfo, disconnect, providerMut, network, setNetwork } = useSolana();

	const [displayButton, setDisplayButton] = useState();
	const [timeFunc, setTimeFunc] = useState();

	useEffect(()=>{
		if(wallet){
			setClient(new helixClient(wallet));
		}
	}, [!!wallet]);

	async function setAccounts(){
		if(client && client.fetchIdoAccount && client.fetchIdoAta){
			setIdoAccount(await client.fetchIdoAccount());
			setIdoAta(await client.fetchIdoAta());
		}
	};

	const intervalFunc = ()=>{
		const today = new Date();
		const diff = endDate - today;
		setDays(parseInt( diff/ (86400000)));
		setHours(parseInt(diff / (14400000) % 24));
		setMinutes(parseInt(diff / (60000) % 60));
		setSeconds(parseInt(diff / (1000) % 60)) ;
		if((diff) < 0){
			clearInterval(timeFunc);
			setTimeFunc();
		}
	};

	useEffect(setAccounts,[client && client.fetchIdoAccount])

	useEffect(()=>{
		setDisplayButton(
			wallet?.connected?(
			idoAccount != undefined? 
			<div className="flex flex-row space-x-32 justify-center place-items-center w-3/4">
				<button 
					className="text-white hover:shadow-silver-glow-sm w-1/2 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25 py-4"
					onClick={()=>{client.idoDeposit(amount)}}>
					Deposit
				</button>
				
				<button 
					className="text-white hover:shadow-silver-glow-sm w-1/2 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25 py-4"
					onClick={()=>{client.idoWithdraw(amount)}}>
					Withdraw
				</button>
			</div>:
			<div>
				<button
					onClick={()=>{client.createIdoAccount; setIdoAccount({})}}
					className="text-white hover:shadow-silver-glow-sm w-full h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25 py-4 px-4"
				>
					Create Account
				</button>
				
			</div>
		):
		<button 
			className="flex flex-row items-center justify-around text-md font-medium bg-[#C8C7CA] px-2 md:px-3 py-1 md:py-2 rounded-md"
			onClick={() => goki.connect()}
		>
			<span>Connect Wallet</span>
			<LightningBoltIcon className="h-4 w-4 pl-1 md:h-6 md:w-6" />
		</button>)
	},[!!client, client.createIdoAccount, wallet && wallet.connected, idoAccount]);

	

	useEffect(()=>{
		if((endDate - new Date()) > 0 ){
			setTimeFunc(setInterval(intervalFunc, 1000));
		}
	},[])

	return(
		<div className="flex flex-col place-items-center transparent w-full h-screen">
			<div className="flex flex-col items-center w-3/4 space-y-10 ">
				<div className="flex flex-col rounded-md bg-[#747474] bg-opacity-50 place-content-center text-5xl text-center h-20 w-1/2 font-mono text-white">
					{timeFunc ? days + ":" + hours + ":" + minutes + ":" + seconds : "Token Sale Live!"}
				</div>
				<div className="rounded-md flex flex-row bg-[#F9F4F4] bg-opacity-50 h-24 pt-4 place-items-right w-3/4 px-10 py-4 h-36">
					<div className="flex flex-col text-white w-3/4 place-items-center mt-1 h-full justify-center">
						<div className="w-full text-center">
							Read more about the token distribution in our Whitepaper
						</div>
						<a href="https://helixdao.org/Litepaper.pdf" target="_blank" className="bg-[#8C8C8C] px-2 mt-2 py-1 rounded-md">
							Learn More
						</a>
					</div>
					<div className="-mt-4 -mr-10">
						<Image
								src = {"/idoassets/distributionpie.png"}
								height = {160}
								width = {290}
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
					{displayButton}
				</div>
				</div>
			
		</div>
	);
}