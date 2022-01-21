import { useState, useEffect } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import Image from "next/image";
import { MintModal } from "./modals";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function BondInterface(props) {
	const [tokenMap, setTokenMap] = useState(new Map());

	const {
		createBondAccount,
		solBond,
		splBond,
		redeemBonds,
		collectCoupon,
	} = HelixWrapper();
			
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
					<thead className="rounded-4xl p-5 m-2">
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
							props.bondsInfo?.map(function (asset, index) {
								return(
									<tr>
										<th>
											<Image 
												src={tokenMap?.get(asset.MainNetAddress)?.logoURI || '/helix2d.png'}
												height={50}
												width={50}
												loading="eager"
											/>
										</th>
										<td>{asset.Name}</td>
										<td>{asset.Price}</td>
										<td>{asset.Roi}</td>
										<td>
											<MintModal 
												bondName={asset.Name}
												client={{
													createBondAccount,
													solBond,
													splBond,
													redeemBonds,
													collectCoupon
												}}
											/>
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

