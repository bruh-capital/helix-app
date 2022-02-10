import { useState } from "react";
import { HelixNetwork } from "./baseContractUtils";

/**
 * Function that returns functions to use for helix
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper(wallet) {
	if (!wallet || !wallet.publicKey) {
		return;
	}
	const helixClient = new HelixNetwork(wallet);
	// console.log(helixClient);

	const stakeToken = async (amount) => {
		await helixClient.Stake(amount);
	}
	
	const unstakeToken = async (amount) => {
		await helixClient.Unstake(amount);
	}

	const createUserAta = async () => {
		await helixClient.CreateUserATA();
	}

	const createVault = async () => {
		await helixClient.InitializeUserVault();
	}

	const createBondAccount = async() =>{
		await helixClient.InitBondAccount();
	}

	const closeBondAccount = async() =>{
		await helixClient.CloseBondAccount();
	}

	const solBond = async(bond_price, maturity, connection) =>{
		await helixClient.SolBond(bond_price, maturity, connection);
	}

	const splBond = async(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals) =>{
		await helixClient.SPLBond(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals);
	}

	const redeemBonds = async() =>{
		await helixClient.RedeemBonds();
	}

	const collectCoupon = async() =>{
		await helixClient.CollectCoupon();
	}

	const changeLockupPeriod = async(duration) =>{
		await helixClient.ChangeLockup(duration);
	}

	const mintAndCloseIdoAccount = async() =>{
		await helixClient.MintAndCloseIDO();
	}

	const idoDeposit = async(amount) =>{
		await helixClient.IDODeposit(amount);
	}

	const idoWithdraw = async(amount) =>{
		await helixClient.IDOWithdraw(amount);
	}

	const getTokenAccountBalance = async(mint_addr) =>{
		return await helixClient.GetTokenAccountBalance(mint_addr);
	}

	const getSolBalance = async() => {
		return await helixClient.GetSolBalance();
	}

	const getBondMarketInfo = async(mint_addr) => {
		return await helixClient.FetchBondMarket(mint_addr);
	}

	const getUserVault = async() =>{
		return await helixClient.FetchUserVault();
	}

	const getProtocolData = async() =>{
		return await helixClient.FetchProtocolData();
	}

	const getProposals = async(government) =>{
		return await helixClient.FetchProposals(government);
	}
	
	// CreateProposal

	const createProposal = async(government_address, title, description, expiration_weeks) =>{
		return await helixClient.CreateProposal(government_address, title, description, expiration_weeks);
	}

	const castVote = async(proposal, choice) =>{
		return await helixClient.CastVote(proposal, choice);
	}
	
	
	const createGovernemnt = async(governed_program_id) =>{
		helixClient.CreateGovernment(governed_program_id);
	}
	const createBondMarket = async (mint) =>{
		helixClient.CreateBondMarket(mint);
	}
	const createHelixMint = async() =>{
		helixClient.CreateHelixMint();
	}
	const governmentOwnedTokenAccount = async (mint, government) =>{
		helixClient.GovernmentOwnedTokenAccount(mint, government);
	}
	const multisigOwnedTokenAccount = async (mint) =>{
		helixClient.MultisigOwnedTokenAccount(mint);
	}
	const mintToAccount = async(mintToAccount, amount) =>{
		helixClient.MintToAccount(mintToAccount, amount);
	}
	const rebase = async() =>{
		helixClient.Rebase();
	}
	const changeRebaseRate = async() =>{
		helixClient.ChangeRebaseRate();
	}
	const createBondSigner = async() =>{
		helixClient.CreateBondSigner();
	}

	return { 
		helixClient,
		stakeToken, 
		unstakeToken, 
		createUserAta, 
		createVault,
		createBondAccount,
		closeBondAccount,
		solBond, 
		splBond, 
		redeemBonds, 
		collectCoupon, 
		changeLockupPeriod, 
		mintAndCloseIdoAccount,
		idoDeposit, 
		idoWithdraw,
		getTokenAccountBalance,
		getSolBalance,
		getBondMarketInfo,
		getUserVault,
		getProtocolData,
		getProposals,
		createProposal,
		castVote,
		createGovernemnt,
		createBondMarket,
		createHelixMint,
		governmentOwnedTokenAccount,
		multisigOwnedTokenAccount,
		mintToAccount,
		rebase,
		changeRebaseRate,
		createBondSigner,
	};
}

