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
		<div className="h-80 items-center border-2 border-black" >
			<div className="flex flex-col items-center h-full w-full space-y-14 border-2 border-black">
				<div className="flex flex-col rounded-md bg-[#747474] place-content-center text-5xl text-center w-1/2 font-mono border-[#9F9F9F] border-2 bg-opacity-50">
					{days} : {hours} : {minutes} : {seconds}
				</div>
				<div className="rounded-md flex flex-row bg-[#F9F4F4] bg-opacity-50 w-1/2 border-2 border-[#FFFFFF] border-opacity-50">
					{/* left side */}
					<div className="grid grid-cols-1 w-2/3">
						<div className="h-20">

						</div>
						<div className="h-20">
							
						</div>
						<div className="flex flex-row space-x-32 justify-center place-items-center w-full">
							<button className="text-black">
								Deposit
							</button>
							
							<button className="text-black">
								Withdraw
							</button>
						</div>
					</div>
					{/* right side */}
					<div className="w-1/3">

					</div>

				</div>
			</div>
			
		</div>
	);
}