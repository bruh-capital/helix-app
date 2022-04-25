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
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="w-full flex flex-row">
				{/* analytics */}
				<div>
					<div className="rounded-50 bg-gray-500">
						Network Status:
						<div className={networkStatus ? 'text-green-500' : 'text-red-500'}>
							{networkStatus ? `Online` : `Unreachable`}
						</div>
					</div>
				</div>

				{/* total volume */}
				<div>
					Total Volume:
					<div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
						{totalVolume}
					</div>
				</div>
					
				{/* other links */}
				<div>
					<a href="https://helixdao.org/ido" target="_self"> IDO </a>
					<a href="https://helixdao.org/app" target="_self"> Dapp </a>
					<a href="https://helixdao.org/" target="_self"> Helix DAO </a>
				</div>
			</div>
			{props.children}
		</header>
	);
}