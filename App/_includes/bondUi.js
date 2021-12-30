import { useState, useEffect } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { token } from "@project-serum/anchor/dist/cjs/utils";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Image from "next/image";

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

	const assets = [
		{
			Name: 'SOL',
			Price: '170.00',
			Roi: '100%',
			Address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		},
		{
			Name: 'USDC',
			Price: '1.00',
			Roi: '100%',
			Address: '2wmVCSfPxGPjrnMMn7rchp4uaeoTqN39mXFC2zhPdri9',
		},
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
		<div className="card flex justify-center bg-white p-10 mt-10">
			<div className="card-body">
				<h2 className="card-title text-black text-4xl font-bold">Mint Bonds</h2>
				<table className="table w-full text-black table-zebra">
					<thead>
						<tr>
							<th></th>
							<th>Accepted Asset</th>
							<th>Price</th>
							<th>ROI</th>
							<th></th>
						</tr>
						{
							assets.map(function (asset, index) {
								return(
									<tr>
										<td>
											<Image 
												src={tokenMap.get(asset.Address)?.logoURI || "/helix2d.png"}
												width={50}
												height={50}
												layout="fill"
											/>
										</td>
										<td>{asset.Name}</td>
										<td>{asset.Price}</td>
										<td>{asset.Roi}</td>
										<td><button className="btn btn-primary">Mint</button></td>
									</tr>
								)
							})
						}
					</thead>
				</table>
			</div>
		</div>
	);
} 