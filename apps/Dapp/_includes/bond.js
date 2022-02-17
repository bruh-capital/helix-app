import Graph from "@includes/components/graph";
import BondModalButton from "@includes/components/bondModal";
import helixContext from "@context/helixContext";
import {useContext, useEffect, useState} from 'react';

export default function Bond(props) {
	const {client} = useContext(helixContext);

	const [markets, setMarkets] = useState({});

	useEffect(async ()=>{
		console.log("setting");
		let objmap = {};
		if(client && client.getBondMarketInfo){
			for(let prop of props.bondItems){
				console.log(prop);
				let market = await client.getBondMarketInfo(prop.tokenAddress);
				console.log(market);
			}
		}
	},[!!client])

	// FIXME(milly): this is temp make sure to include this on
	let bondItems = [{
			asset: "SOL",
			roi: "69%",
			price: "69.69"
		},
		{
			asset: "LOS",
			roi: "69%",
			price: "69.69"
		}
	]

	return(
		<div className="-mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="grid gap-x-12 gap-y-6 mb-6 md:mb-16 grid-cols-1 md:grid-cols-2 grid-rows-6 lg:grid-rows-3 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full justify-around">
				<div className="flex col-start-1 py-6 row-start-1 flex-col col-span-1 lg:col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph 
						graphName="Total Value Deposited"
					/>
				</div>
				<div className="flex col-start-1 md:col-start-2 py-6 row-start-4 md:row-start-1 flex-col col-span-1 lg:col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph 
						graphName="HLX Price"
					/>
				</div>
			</div>
			<div className="flex flex-col  md:px-24 xl:px-32 2xl:px-64">
				<div className="flex flex-col rounded-xl mx-8 md:mx-0 border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F] items-start">
					<div className="font-bold mb-6 text-2xl md:text-3xl text-[#272629] dark:text-white pl-10 md:pl-16 pt-10 mx-6 md:mx-16">
						Bonds
					</div>
					<table className="w-5/6 self-center">
						<tr className="border-b -px-4 border-[#52555A]">
							<th>Accepted Asset</th>
							<th>Price</th>
							<th>ROI</th>
							<th></th>
						</tr>
						{props.bondItems?.map((bond, index) => {
							console.log(bond);
							return <tr className="py-4" key={index}>
								<td className="text-center text-[#D8D8D8]">{bond.asset}</td>
								{/* <td className="text-center text-[#696B70]">{bond.roi}</td>
								<td className="text-center text-[#696B70]">{bond.price}</td> */}
								<td className="items-center">
									<BondModalButton 
										tokenAddress={bond.tokenAddress}
										tokenName = {bond.asset}
										network = {props.network}
										decimals = {bond.decimals}
									/>
								</td>
							</tr>
						})}
					</table>
				</div>
			</div>
		</div>
	);
}

// devnet addresses
Bond.defaultProps = {
	network: "devnet",
	// testnet token addresses. we have mainnet ones cba to dig up a grave rn though
	bondItems:[
		{
			asset:"USDC",
			tokenAddress:"yxdMpffjwBqPnokGfZY2AaTJDzth3umWcqiKFn9fGJz",
			decimals: 6,
		},
		{
			asset:"SOL",
			tokenAddress:"11111111111111111111111111111111",
			decimals:9,
		},
		{
			asset:"wUST",
			tokenAddress:"AZ2taR7C7LrGuCXApgCcyxfLsDM7HJH8aDyRHFCRY2WE",
			decimals:9,
		}
	]
}