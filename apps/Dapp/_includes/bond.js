import Graph from "@includes/components/graph";
import Image from "next/image";
import BondModalButton from "@includes/components/bondModal";
import helixContext from "@context/helixContext";
import {useContext, useEffect, useState} from 'react';
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";

// create delete dynamic
// create if no account
// blur bond buttons if wallet not connected && no account

export default function Bond(props) {
	const wallet = useConnectedWallet();
	const goki = useWalletKit();
	const {client} = useContext(helixContext);
	const { network } = useSolana();

	const [tokenMap, setTokenMap] = useState(new Map());

	const [bondAccount, setBondAccount] = useState();
	const [tableRows, setTableRows] = useState();

	const [actionButton, setActionButton] = useState();

	async function checkBondAccount(){
		if(client && client.getBondAccount){
			let bondAcc = await client.getBondAccount();
			if(bondAcc != undefined){
				setBondAccount(bondAcc);
			}
		}
	}

	// Image thingy		
	// TODO(Milly):
	// Some weird bug happens where the images only load after wallet is connected plz fix
	useEffect(() => {
		new TokenListProvider().resolve().then(tokens => {
			const tokenList = tokens.getList();

			setTokenMap(tokenList.reduce((map, item) => {
				map.set(item.address, item);
				return map;
			}, new Map()));
		});
	}, [setTokenMap]);	

	useEffect(async ()=>{
		let markets = {};
		let pricemap = {};
		if (client && client.getMarkets) {
			for(let bond of props.bondItems){
				markets[bond.asset] = props.network == "mainnet" ?
					await client.getBondMarketInfo(bond.mainnetTokenAddress):
					await client.getBondMarketInfo(bond.devnetTokenAddress);
				pricemap[bond.asset] = await client.getTokenPrice(bond.asset, props.network);
			}
		}

		setTableRows(props.bondItems?.map((bond, index) => {
			return (
				<tr key={index}>
					<td className="flex flex-row text-center dark:text-[#D8D8D8] py-2">
						<div className="rounded-full overflow-hidden">
							<Image
								src={
										tokenMap?.get(bond.mainnetTokenAddress)?.logoURI ||
										"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
									}
								height={35}
								width={35}
								layout="fixed"
								loading="eager"
							/>
						</div>
						<span className="my-auto mx-2">{bond.asset}</span>
					</td>
					<td className="text-center dark:text-[#D8D8D8] py-2">
					{
						pricemap && pricemap[bond.asset] ?
							pricemap[bond.asset].aggregate.price.toLocaleString(undefined, { maximumFractionDigits: 2 })
							: "N/A" 
					}
					</td>
					<td className="text-center dark:text-[#D8D8D8] py-2">
						{markets && markets[bond.asset] ? markets[bond.asset].couponRates[1].toNumber()/10 : 0}%
					</td>
					<td className="content-center text-center py-2">
						{wallet?.connected && bondAccount ? 
						<BondModalButton 
							tokenAddress={network === "mainnet" ? bond.mainnetTokenAddress : bond.devnetTokenAddress}
							tokenName = {bond.asset}
							network = {props.network}
							decimals = {bond.decimals}
							market = {markets[bond.asset]}
							price = {pricemap && pricemap[bond.asset] ? pricemap[bond.asset].aggregate.price : "none"}
						/>:<></>}
					</td>
				</tr>
			);
		}))
	}, [wallet && wallet.connected, bondAccount])

	useEffect(()=>{
	 	setActionButton(<button
			className="rounded-lg pt-10 mb-6 text-sm text-[#696B70] font-medium dark:hover:text-zinc-200"
			onClick={() => {wallet?.connected && client ? (bondAccount ? client.closeBondAccount() && setBondAccount() : client.createBondAccount() && setBondAccount("created")) : goki.connect() && checkBondAccount()}}
		>
			{ wallet?.connected && client ? (bondAccount ? "Close Account" : "Open Account") : "Connect Wallet"}
		</button>
)
	}, [wallet && wallet.connected, bondAccount])


	useEffect(checkBondAccount, [!!client])

	return(
		<div className="-mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="grid gap-x-12 gap-y-6 mb-6 md:mb-16 grid-cols-1 md:grid-cols-2 grid-rows-6 md:grid-rows-3 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full justify-around">
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
			<div className="flex flex-col md:px-24 xl:px-32 2xl:px-64">
				<div className="flex flex-col rounded-xl mx-8 md:mx-0 border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F] items-start">
					<div className="flex flex-row w-5/6 self-center justify-between">
						<div className="font-bold mb-6 text-2xl md:text-3xl text-[#272629] dark:text-white pt-10">
							Bonds
						</div>
						<div className="flex flex-row-reverse w-full">
							{actionButton}
						</div>
					</div>
					<table className="w-5/6 self-center mb-5">
						<tr className="border-b py-8 mx-4 border-[#52555A]">
							<th className="text-left mb-10">Accepted Asset</th>
							<th className="mb-10">Price</th>
							<th className="mb-10">Minimum ROI</th>
							<th className="mb-10"></th>
						</tr>
						{tableRows}
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
			asset: "USDC",
			mainnetTokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
			devnetTokenAddress: "yxdMpffjwBqPnokGfZY2AaTJDzth3umWcqiKFn9fGJz",
			decimals: 9,
			// live net is 6
			// decimals: 6,
		},
		{
			asset: "SOL",
			mainnetTokenAddress: "11111111111111111111111111111111",
			devnetTokenAddress: "11111111111111111111111111111111",
			decimals: 9,
		},
		{
			asset: "wUST",
			mainnetTokenAddress: "CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm",
			devnetTokenAddress: "AZ2taR7C7LrGuCXApgCcyxfLsDM7HJH8aDyRHFCRY2WE",
			decimals: 9,
		},
		// {
		// 	asset: "UXD",
		// 	mainnetTokenAddress: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
		// 	devnetTokenAddress: "UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M", // this is filler please find the dnet real one
		// 	decimals: 6,
		// },
	]
}