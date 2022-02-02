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
			setProgramList({
				"helix":helixClient.helix_program,
				"bond":helixClient.bond_program,
				"governance":helixClient.governance_program,
				// "multisig":helixClient.multisig_program,
			});
		}
	},[helixClient])

	function argGenerator(args, types, tidbit){
		return args.map((argument, argind)=>{
			switch(argument.type){
				case "bool":
					return <div>
						<input
						type = "checkbox"
						key = {argument.name + tidbit + argind}
						/>
						{argument.name + tidbit}
					</div>
					break;
				case "u8":
				case "i8":
				case "u16":
				case "i16":
				case "u32":
				case "i32":
				case "u64":
				case "i64":
				case "u128":
				case "i128":
					return <input
						type = "number"
						placeholder = {tidbit + argument.name}
						key = {argument.name + tidbit + argind}
						onChange = {(e)=>{
							this.value = e.target.value;
						}}
					/>
					break;
				case "bytes":
					return <div
							key = {argument.name + tidbit + argind}
						>
							bytes here. indianeros fucked up
						</div>
					break;
				case "string":
				case "publicKey":
					return <input
							type="text"
							placeholder = {tidbit + argument.name}
							key = {argument.name + tidbit + argind}
							onChange = {(e)=>{
								this.value = e.target.value;
							}}
						/>
					break;
				default:
					console.log(argument.name, argument.type);
					switch(Object.keys(argument.type)[0]){
						case "option":
							return argGenerator([{
								name: argument.name,
								type: argument.type.option
							}], types, tidbit+"optional");
							break;
						case "vec":
							let components = [];
							components.push(
								argGenerator([{
									name: argument.name + components.length,
									type: argument.type.vec
								}], types, tidbit+"vec")
							)
							return <div
									key = {argument.name + tidbit + argind}
								>
								{components}
								<button
									onClick={()=>{
										components.push(
										argGenerator([{
											name: argument.name + components.length,
											type: argument.type.vec
										}], types, tidbit+"vec"));
										console.log(components);
									}}
								>
									Add To Vec
								</button>
							</div>
							break;
						case "defined":
							for(let type of types){
								if(type.name == argument.type.defined){
									return argGenerator(type.type.fields, types, tidbit+"");
								}
							}
						break;
					}
				
					break;
			}
		})
	}

	return(
		<div className="my-5 grid md:grid-cols-1 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-4 place-content-center">
			<input 
				type="radio"
				name="program_choice"
				value="helix"
				onClick={()=>{setCurrentProgram("helix")}}
			/>helix
			<input 
				type="radio"
				name="program_choice"
				value="bond"
				onClick={()=>{setCurrentProgram("bond")}}
			/>bond
			<input 
				type="radio"
				name="program_choice"
				value="governance"
				onClick={()=>{setCurrentProgram("governance")}}
			/>governance
			{/* <input 
				type="radio"
				name="program_choice"
				value="multisig"
				onClick={()=>{setCurrentProgram("multisig")}}
			/>multisig */}
			{
				programList[chosenProgram]?._idl.instructions.map((instruction, ind)=>{
					return <div key = {ind}>
						{instruction.name}
						{
							argGenerator(instruction.args, programList[chosenProgram]._idl.types, "")
						}
					</div>
				})
			}
		</div>
	)
}