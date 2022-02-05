import React, { useEffect, useState, useContext } from "react";
import helixContext from "@context/helixClientContext";

export default function dashboardUi(props) {
	const {client} = useContext(helixContext);

	const [bondMarketMint, setBondMarketMintAddress] = useState();
	const [tokenAccountMint, setTokenAccountMintAddress] = useState();
	const [government, setGovernment] = useState("AuUJuBCgjeQJM9h864Bf5aNGkVLu8pYH5gYyKgMWwaGv");
	const [governedProgram, setGovProgram] = useState("AuUJuBCgjeQJM9h864Bf5aNGkVLu8pYH5gYyKgMWwaGv");
	const [mintAmount, setMintAmount] = useState();
	const [mintToAcc, setMintToAcc] = useState();
	const [rebaseRate, setRebaseRate] = useState();

	useEffect(()=>{
		if(client){
			setMintToAcc(client.helixClient.wallet.publicKey.toString());
		}
	},[client])
	return(
		<div className="my-5 grid md:grid-cols-1 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-4 place-content-center">

			<div className="bg-white rounded-box py-5 border-2 border-black">
				<input
					type="text"
					placeholder="mint"
					className="input input-bordered text-black"
					value={bondMarketMint || ''}
					onChange={(e) => setBondMarketMintAddress(e.target.value)}
				/>
				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.createBondMarket</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createBondMarket(bondMarketMint)}}
					>client.createBondMarket</button>
				</div>

			</div>
		

			<div className="bg-white rounded-box py-5 border-2 border-black">
				<input
					type="text"
					placeholder="governed program"
					className="input input-bordered text-black"
					value={governedProgram || ''}
					onChange={(e) => setGovProgram(e.target.value)}
				/>


				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.createGovernemnt</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createGovernemnt(governedProgram)}}
					>client.createGovernemnt</button>
				</div>
			</div>

			<div className="grid grid-cols-2 bg-white rounded-box py-5 border-2 border-black">
				<input
					type="text"
					placeholder="mint"
					className="input input-bordered text-black"
					value={tokenAccountMint || ''}
					onChange={(e) => setTokenAccountMintAddress(e.target.value)}
				/>
				<input
					type="text"
					placeholder="governed program address"
					className="input input-bordered text-black"
					value={government || ''}
					onChange={(e) => setGovernment(e.target.value)}
				/>
				<div className="grid grid-rows-1 grid-cols-2 my-2 gap-4">
					<div className="text-base text-4xl text-gray8">create government owned token account</div>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.governmentOwnedTokenAccount(mint, government)}}
					>create</button>
				</div>
				
				<div className="grid grid-rows-1 grid-cols-2 my-2 gap-4">
					<h3 className="text-base text-4xl text-gray8">create multisig owned token account</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.multisigOwnedTokenAccount(mint)}}
					>create</button>
				</div>
			</div>
			

			<div className="bg-white rounded-box py-5 border-2 border-black">
				<input
					type="number"
					placeholder="mint amount"
					className="input input-bordered text-black"
					value={mintAmount || ''}
					onChange={(e) => setMintAmount(e.target.value)}
				/>

				<input
					type="text"
					placeholder="mint to account"
					className="input input-bordered text-black"
					value={mintToAcc || ''}
					onChange={(e) => setMintToAcc(e.target.value)}
				/>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.mintToAccount</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.mintToAccount(mintToAcc, mintAmount)}}
					>client.mintToAccount</button>
				</div>
			</div>
			
			
			
			<div className="bg-white rounded-box py-5 border-2 border-black">
				<input
					type="number"
					placeholder="client.rebase rate (every 10 is 1%)"
					className="input input-bordered text-black"
					value={rebaseRate || ''}
					onChange={(e) => setRebaseRate(e.target.value)}
				/>
			<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
				<h3 className="text-base text-4xl text-gray8">client.changeRebaseRate</h3>
				<button
					className="btn btn-primary mx-2"
					onClick = {() =>{client.changeRebaseRate()}}
				>client.changeRebaseRate</button>
			</div>
			</div>
			
			
			<div className="bg-white rounded-box py-5 border-2 border-black">
				<h3 className="text-base text-4xl text-gray8">DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING</h3>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.createHelixMint</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createHelixMint()}}
					>client.createHelixMint</button>
				</div>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.rebase</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.rebase()}}
					>client.rebase</button>
				</div>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-1/4">
					<h3 className="text-base text-4xl text-gray8">client.createBondSigner</h3>
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createBondSigner()}}
					>client.createBondSigner</button>
				</div>
			</div>
		</div>
	)
}