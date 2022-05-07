//import {getMarketVolume}

import { useEffect, useState } from "react";

function getMarketVolume(){}

// this is the thin black bar on the top
export default function GlobalHeader(props) {
	const [totalVolume, setTotalVolume] = useState(0);

	const [networkStatus, setNetWorkStatus] = useState(0);

	// setTotalVolume on wallet or something
	useEffect(()=>{

	},[])

	return(
		<header className="flex flex-col w-full">
			<div className="w-full flex flex-row place-items-center mx-2">
				{/* analytics */}
				<div className="p-1 flex flex-row rounded-md bg-gray-500 place-items-center h-full text-xs">
					Network Status:
					<div className={ "mx-2 place-items-center " + (networkStatus ? 'text-green-500' : 'text-red-500')}>
						{networkStatus ? `Online` : `Unreachable`}
					</div>
				</div>

				{/* total volume */}
				<div className="ml-2 flex flex-row justify-center grow h-full">
					Total Volume:
					<div className=" ml-2 text-transparent text-center bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
						{totalVolume}
					</div>
				</div>
					
				{/* other links */}
				<div className="flex flex-row mx-2">
					<div className="grid grid-row m-2 h-full w-1/8">
						<a href="https://helixdao.org/ido" target="_self"> IDO </a>
					</div>
					<div className="grid grid-row m-2 h-full w-1/8">
						<a href="https://helixdao.org/app" target="_self"> Dapp </a>
					</div>
					<div className="grid grid-row m-2 h-full w-1/8">
						<a href="https://helixdao.org/" target="_self"> Helix DAO </a>
					</div>
				</div>
			</div>
			{props.children}
		</header>
	);
}