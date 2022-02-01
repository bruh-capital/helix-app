import { useState, useEffect } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

export default function GovernanceInterface(props){
    // getProposals = async(government)
    // createProposal = async(government_address, title, description, expiration_weeks, pid, accs, data)
    // castVote = async(proposal, choice)

    const {
        getProposals,
        createProposal,
        castVote,
    } = HelixWrapper();

    return(
        <div className="grid justify-items-center justify-center w-full grid-cols-2">
            
        </div>
    )
}