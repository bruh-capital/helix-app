import { useState, useEffect } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { token } from "@project-serum/anchor/dist/cjs/utils";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Modal, { MintModal } from "./modals";

export default function BondInterface(props) {
	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond
	} = HelixWrapper();

	const [bondAmount, setBondAmount] = useState(0);
	const [bondAsset, setBondAsset] = useState("");
	const [tokenMap, setTokenMap] = useState(new Map());

	// FIXME(Millionz): make this part of API
	const assets = [
		{
			Name: 'SOL',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'So11111111111111111111111111111111111111112'
		},
		{
			Name: 'USDC',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		},
		{
			Name: 'wUST',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm',
		},
		/*FIXME(millionz): Implement!
		{
			Name: 'UXD',
			Price: 'N/A',
			Roi: 'N/A%',
			Address: '????',
		},
		{
			Name: 'SOL-HLX LP',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: '',
		},*/
	];

	useEffect(() => {
		new TokenListProvider().resolve().then(tokens => {
			const tokenList = tokens.getList();

			setTokenMap(tokenList.reduce((map, item) => {
				map.set(item.address, item);
				return map;
			}, new Map()));
		});
	}, [setTokenMap]);

	return (
		<div 
			className="card flex justify-center bg-white p-3 mt-10"
			style={{boxShadow: "0px 0px 12px rgba(256, 256, 256, 1)"}}
		>
			<div className="card-body">
				<h2 className="card-title text-black text-4xl font-bold">Mint Bonds</h2>
				<table className="table table-zebra w-full text-black">
					<thead>
						<tr>
							<th></th>
							<th>Accepted Asset</th>
							<th>Price</th>
							<th>ROI</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							assets.map(function (asset, index) {
								return(
									<tr>
										<th>
											<Image 
												src={tokenMap.get(asset.MainNetAddress)?.logoURI || '/helix2d.png'}
												height={50}
												width={50}
											/>
										</th>
										<td>{asset.Name}</td>
										<td>{asset.Price}</td>
										<td>{asset.Roi}</td>
										<td>
											<MintModal bondName={asset.Name}/>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
} 