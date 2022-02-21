import React, { useEffect, useState, useContext} from "react";
import helixContext from "@context/helixClientContext";

export default function dashboardUi(props) {
	const {client} = useContext(helixContext);
	

	// for the time being users cant do this because i dont want them to
	// CreateGovernment governed_program

	// CreateProposal government_address, title, description, expiration_weeks, pid, accs, data
	// CastVote proposal, choice
	// FetchProposals governed_program

	// 	client.getProposals
	//  client.createProposal
	//  client.castVote

	const [proposalGovAddress, setProposalGovAddress] = useState("AuUJuBCgjeQJM9h864Bf5aNGkVLu8pYH5gYyKgMWwaGv");
	const [proposalTitle, setProposalTitle] = useState("");
	const [proposalDescription, setProposalDescription] = useState("");
	const [proposalExpiration, setProposalExpiration] = useState(0);

	// usused for now
	const [proposalPid, setProposalPid] = useState("");
	const [proposalAccs, setProposalAccs] = useState("");
	const [proposalData, setProposalData] = useState("");
	
	const [voteProposal, setVoteProposal] = useState("");
	const [voteChoice, setVoteChoice] = useState(true);
	
	const [fetchProposalsGovAddress, setFetchProposalsGovAddress] = useState("AuUJuBCgjeQJM9h864Bf5aNGkVLu8pYH5gYyKgMWwaGv");
	const [proposalList, setProposalList] = useState();

	useEffect(async ()=>{
		if (client){
			let proposals = await client.getProposals(fetchProposalsGovAddress);
			console.log(proposals);
			setProposalList(proposals);
		}
	}, [fetchProposalsGovAddress, client])


	return(
		<div className="my-5 grid md:grid-cols-1 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-4 place-content-center text-black">
			<input
				type = "text"
				value = {fetchProposalsGovAddress}
				onChange={(e)=>{setFetchProposalsGovAddress(e.target.value)}}
			/>

			<input
				type = "text"
				// placeholder = "governed program id"
				value = {proposalGovAddress}
				onChange={(e)=>{setProposalGovAddress(e.target.value)}}
			/>
			<input
				type = "text"
				placeholder = "proposal title"
				value = {proposalTitle}
				onChange={(e)=>{setProposalTitle(e.target.value)}}
			/>
			<input
				type = "text"
				placeholder = "proposal description"
				value = {proposalDescription}
				onChange={(e)=>{setProposalDescription(e.target.value)}}
			/>
			<input
				type = "number"
				value = {proposalExpiration}
				onChange={(e)=>{setProposalExpiration(e.target.value)}}
			/>
			<button
				onClick={()=>{client.createProposal(proposalGovAddress, proposalTitle, proposalDescription, proposalExpiration)}}
			>Create Proposal</button>
			
			
			<input
				type = "text"
				placeholder = "proposal id"
				value = {voteProposal}
				onChange={(e)=>{setVoteProposal(e.target.value)}}
			/>
			<input
				type = "checkbox"
				placeholder = "vote choice"
				value = {voteChoice}
				onChange={(e)=>{setVoteChoice(e.target.checked)}}
			/>
			<button
				onClick={()=>{client.castVote(voteProposal, voteChoice)}}
			>Cast Vote</button>

		</div>
	)
}