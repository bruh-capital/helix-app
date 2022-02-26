import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Stat from "@includes/components/stat";

import { useTheme } from "next-themes";

import HelixContext from "@context/helixContext";

export default function Dash(props) {
	const {client, setClient} = useContext(HelixContext);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const endDate = new Date(1646110800000);

	const [idoAccount, setIdoAccount] = useState();
	const [idoAta, setIdoAta] = useState();

	const [amount, setAmount] = useState();

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
		<div className="items-center pb-16 absolute top-24 transparent w-full" >
			<div className="flex flex-col items-center h-full w-full space-y-10 ">
				<div className="flex flex-col rounded-md bg-[#747474] place-content-center text-5xl text-center h-24 w-1/2 font-mono border-[#9F9F9F] border-2 bg-opacity-50 text-white">
					{days} : {hours} : {minutes} : {seconds}
				</div>
				<div className="rounded-md flex flex-row bg-[#F9F4F4] bg-opacity-50 w-1/2 border-2 h-80 border-[#FFFFFF] border-opacity-50 pl-4">
					{/* left side */}
					<div className="grid grid-cols-1 w-3/4 pt-4">
						<div className="grid grid-cols-1 h-10 w-full place-items-center">
							<div className="text-[#45008c] w-3/4 h-full bg-opacity-50 text-center pt-4 text-2xl font-bold font-mono">
								Your Contributions: {200} USDC
							</div>
						</div>
						<div className="grid grid-cols-1 w-full place-items-center">
							<input
								type="number"
								className="rounded-md bg-[#ababab] border-2 border-[#FFFFFF] bg-opacity-75 text-right w-2/3 text-xl outline-none h-10 text-opacity-50"
								value={amount || ""}
								onChange ={(e)=>{setAmount(e.target.value)}}
							/>
						</div>
						<div className="flex flex-row space-x-32 justify-center place-items-center w-full">
							<button 
								className="text-white border-2 border-white w-1/3 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25">
								Deposit
							</button>
							
							<button 
								className="text-white border-2 border-white w-1/3 h-1/2 rounded-md bg-[#FFFFFF] bg-opacity-25">
								Withdraw
							</button>
						</div>
					</div>
					{/* right side */}
					<div className="grid grid-cols-1 place-items-center w-1/3 text-[#45008c] pr-2">
						<div className="text-6xl pt-16">
							{20}
						</div>
						<div className="text-xl font-mono font-bold">
							Total USDC Deposited
						</div>
					</div>

				</div>
			</div>
			
		</div>
	);
}