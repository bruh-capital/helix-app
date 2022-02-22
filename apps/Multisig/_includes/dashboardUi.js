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
		<div className="my-5 grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-4 place-content-center">

			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<input
					type="text"
					placeholder="mint address"
					className="input input-bordered text-gray bg-neutral mt-4 mb-4 w-full"
					value={bondMarketMint || ''}
					onChange={(e) => setBondMarketMintAddress(e.target.value)}
				/>
				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createBondMarket(bondMarketMint)}}
					>Create Bond Market</button>
				</div>
				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.closeBondMarket(bondMarketMint)}}
					>Close Bond Market</button>
				</div>

			</div>
		

			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<input
					type="text"
					placeholder="governed program"
					className="input input-bordered text-gray bg-neutral w-full mt-4 mb-4"
					value={governedProgram || ''}
					onChange={(e) => setGovProgram(e.target.value)}
				/>


				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createGovernemnt(governedProgram)}}
					>Create Government</button>
				</div>
			</div>

			<div className="grid grid-cols-1 bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-[#FFFFFF] rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<div className="text-base text-4xl text-white">Create Token Account</div>
				<input
					type="text"
					placeholder="mint"
					className="input input-bordered text-gray bg-neutral mt-2"
					value={tokenAccountMint || ''}
					onChange={(e) => setTokenAccountMintAddress(e.target.value)}
				/>
				<input
					type="text"
					placeholder="governed program address"
					className="input input-bordered text-gray bg-neutral mt-2 mb-2"
					value={government || ''}
					onChange={(e) => setGovernment(e.target.value)}
				/>

				<div className="grid grid-cols-2">
					<button
							className="btn btn-primary mx-2"
							onClick = {() =>{client.governmentOwnedTokenAccount(mint, government)}}
						>Gov Owned</button>
					
					<button
							className="btn btn-primary mx-2"
							onClick = {() =>{client.multisigOwnedTokenAccount(mint)}}
						>Multisig Owned</button>
				</div>
			</div>
			
			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<div className="grid grid-cols-2 mt-4 mb-4">
				<input
					type="number"
					placeholder="mint amount"
					className="input input-bordered text-gray bg-neutral mr-6"
					value={mintAmount || ''}
					onChange={(e) => setMintAmount(e.target.value)}
				/>

				<input
					type="text"
					placeholder="mint to account"
					className="input input-bordered text-gray bg-neutral"
					value={mintToAcc || ''}
					onChange={(e) => setMintToAcc(e.target.value)}
				/>
				</div>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.mintToAccount(mintToAcc, mintAmount)}}
					>Mint To Account</button>
				</div>
			</div>
			
			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<input
					type="number"
					placeholder="rebase rate (every 10 is 1%)"
					className="input input-bordered text-gray bg-neutral w-full mt-4 mb-4"
					value={rebaseRate || ''}
					onChange={(e) => setRebaseRate(e.target.value)}
				/>
			<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4">
				<button
					className="btn btn-primary mx-2"
					onClick = {() =>{client.changeRebaseRate(rebaseRate)}}
				>Change Rebase Rate</button>
			</div>
			</div>
			
			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-full">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createHelixMint()}}
					>Create Helix Mint</button>
				</div>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-full">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.rebase()}}
					>Rebase </button>
				</div>

				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-full">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createBondSigner()}}
					>Create Bond Signer</button>
				</div>
			</div>

			<div className="bg-black bg-opacity-70 text-white text-sm md:text-xl px-8 py-4 font-normal border-solid border-2 border-slate rounded-2xl shadow-pink-glow-md hover:shadow-pink-glow-lg hover:scale-105">
				<div className="grid grid-rows-1 grid-cols-1 my-2 gap-4 w-full">
					<button
						className="btn btn-primary mx-2"
						onClick = {() =>{client.createIdoAta()}}
					>Create IDO Ata</button>
				</div>
			</div>

		</div>
	)
}