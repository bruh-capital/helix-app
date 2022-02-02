import React, { useEffect, useState } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function dashboardUi(props) {
	const {
		helixClient,
		createGovernemnt,
		createBondMarket,
		createHelixMint,
		governmentOwnedTokenAccount,
		multisigOwnedTokenAccount,
		mintToAccount,
		rebase,
		changeRebaseRate,
		createBondSigner
	} = HelixWrapper();

	const [programList, setProgramList] = useState([]);
	const [chosenProgram, setCurrentProgram] = useState();

	useEffect(()=>{
		if(helixClient){
			setProgramList([
				helixClient.helix_program,
				helixClient.bond_program,
				helixClient.governance_program,
				helixClient.multisig_program,
			]);
		}
	},[helixClient])

	return(
		<div className="my-5 grid md:grid-cols-1 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-4 place-content-center">
			<input 
				type="radio"
				name="program_choice"
				value="helix"
				onClick={(e)=>{setCurrentProgram(e.target.value)}}
			/>helix
			<input 
				type="radio"
				name="program_choice"
				value="bond"
				onClick={(e)=>{setCurrentProgram(e.target.value)}}
			/>bond
			<input 
				type="radio"
				name="program_choice"
				value="governance"
				onClick={(e)=>{setCurrentProgram(e.target.value)}}
			/>governance
			<input 
				type="radio"
				name="program_choice"
				value="multisig"
				onClick={(e)=>{setCurrentProgram(e.target.value)}}
			/>multisig
			{
				programList[chosenProgram]?._idl.instructions.forEach((instruction)=>{

				})
			}
		</div>
	)
}