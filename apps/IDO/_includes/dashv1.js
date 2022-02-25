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
		<div className="h-screen items-center mt-4 lg:mt-10 lg:pb-36" >
			
			<div className="flex flex-row justify-center w-full pb-20 h-1/2">
					<Stat
						statName="Amount Deposited"
						statValue={0}
						statChange={0}
					/>
					<Stat
						statName="Total in Reserve"
						statValue={0}
						statChange={0}
					/>
			</div>
			<div className="flex flex-row justify-center w-full pb-20 h-1/2">
					<div>
						{days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
					</div>
			</div>
			<div className="flex flex-row justify-center w-full">
				<input
					type="number"
					value = {amount}
					onChange = {(e)=>{setAmount(e.target.value)}}
				/>
			</div>
			<div className="grid grid-cols-2">
				<button className="md:p-5 w-1/4 rounded-lg text-white bg-[#101010] m-auto content-center hover:shadow-pink-glow-md hover:ease-out duration-300"
					onClick={()=>{client.idoDeposit(amount)}}
				>
					Deposit
				</button>
				<button className="md:p-5 w-1/4 rounded-lg text-white bg-[#101010] m-auto content-center hover:shadow-pink-glow-md hover:ease-out duration-300"
					onClick={()=>{client.idoWithdraw(amount)}}
				>
					Withdraw
				</button >
			</div>
			<div className="grid grid-cols-1">
			<button className="md:p-5 w-1/4 rounded-lg text-white bg-[#101010] m-auto content-center hover:shadow-pink-glow-md hover:ease-out duration-300"
					onClick={()=>{client.createIdoAccount()}}
				>
					Create Account
				</button >
			</div>
		</div>
	);
}