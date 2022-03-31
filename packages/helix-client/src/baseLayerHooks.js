import { useState } from "react";
import { useNotifications } from "reapop";
import { HelixNetwork } from "./baseContractUtils";

// TODO(millionz): change the base utils to return a transaction hash for ops

/**
 * Function that returns functions to use for helix
 * @param {wallet} wallet - wallet to use for interactions
 * @param {notify} notify - function to use for notifications
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper(wallet, notify) {
	if (!wallet || !wallet.publicKey) {
		return;
	}

	// Constructs a new helix client for this wrapper
	const helixClient = new HelixNetwork(wallet);

	// if you have a vault, stake HLX in the protocol
	const stakeToken = async (amount) => {
		try {
			await helixClient.Stake(amount);
			notify('add txn link here', 'success', { title: 'Staked ' + amount + ' HLX' });
		} catch(e) {
			notify(e.message, 'error', {title: 'Stake Failed'});
			throw e;
		}
	}
	
	// withdraw HLX from the protocol (vault)
	const unstakeToken = async (amount) => {
		try {
			await helixClient.Unstake(amount);
			notify('add txn link here', 'success', { title: 'Unstaked ' + amount + ' HLX' });
		} catch(e) {
			notify(e.message, 'error', { title: 'Unstake Failed' });
			throw e;
		}
	}

	// create a user token account for HLX
	// I don't think we need to be made aware of this not throwing an error
	const createUserAta = async () => {
		try {
			await helixClient.CreateUserATA();
		} catch(e) {
			notify(e.message, 'error', { title: 'Create HLX ATA Failed' });
			throw e;
		}
	}

	// create a user stake vault
	const createVault = async () => {
		try {
			await helixClient.InitializeUserVault();
			notify('add txn link here', 'success', { title: 'Created User Vault' });
		} catch (e) {
			notify(e.message, 'error', {title: 'Create User Vault Failed'});
			throw e;
		}
	}

	// close a user stake vault
	const closeVault = async () => {
		try {
			await helixClient.DeleteUserVault();
		} catch (e) {
			notify(e.message, 'error', { title: 'Close User Vault Failed' });
			throw e;
		}
	}

	// open a user bond account
	const createBondAccount = async() =>{
		try{
			// FIXME: for some reason you need to make the account manually regardeless
			// of one exists or not
			await helixClient.InitBondAccount();
			notify('add txn link here', 'success', { title: 'Created Bond Account' });
		} catch (e) {
			notify(e.message, 'error', { title: 'Create Bond Account Failed' });
			throw e;
		}
	}

	// close a user bond account
	const closeBondAccount = async() =>{
		try{
			await helixClient.CloseBondAccount();
			notify('add txn link here', 'success', { title: 'Closed Bond Account' });
		} catch(e) {
			notify(e.message, 'error', { title: 'Close Bond Account Failed' });
			throw e;
		}
	}

	// mint SOL bonds
	const solBond = async(bond_price, maturity, connection) =>{
		try {
			await helixClient.SolBond(bond_price, maturity, connection);
			notify('add txn link here', 'success', { title: 'Minted SOL Bond' });
		} catch(e) {
			notify(e.message, 'error', { title: 'Mint SOL Bond Failed' });
			throw e;
		}
	}

	// mint SPL token bonds
	const splBond = async(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals) =>{
		try{
			await helixClient.SPLBond(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals);
			notify('add txn link here', 'success', { title: 'Minted SPL Bond' });
		} catch (e) {
			notify(e.message, 'error', { title: 'Mint SPL Bond Failed' });
			throw e;
		}
	}

	// redeem all bonds
	const redeemBonds = async() =>{
		try {
			await helixClient.RedeemBonds();
			notify('add txn link here', 'success', { title: 'Redeemed Bonds' });
		} catch(e) {
			notify(e.message, 'error', { title: 'Redeem Bonds Failed' });
			throw e;
		}
	}

	const collectCoupon = async() =>{
		await helixClient.CollectCoupon();
	}

	// change the lockup period of the stake vault
	const changeLockupPeriod = async(duration) =>{
		try{
			await helixClient.ChangeLockup(duration);
			notify('add txn link here', 'success', { title: 'Lockup Changed' });
		} catch(e) {
			notify(e.message, 'error', { title: 'Change Lockup Failed' });
			throw e;
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////
	// IDO contract functions

	const mintAndCloseIdoAccount = async() =>{
		await helixClient.MintAndCloseIDO();
	}

	const idoDeposit = async(amount) =>{
		await helixClient.IDODeposit(amount);
	}

	const idoWithdraw = async(amount) =>{
		await helixClient.IDOWithdraw(amount);
	}
	const createIdoAccount = async() =>{
		await helixClient.CreateIdoAccount();
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

	const getBondAccount = async() =>{
		try{
			return await helixClient.FetchBondAccount();
		}catch(e){
			return undefined;
		}
	}

	const getUserVault = async() =>{
		try{
			return await helixClient.FetchUserVault();
		}catch(e){
			return undefined;
		}
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
	const closeBondMarket = async (mint) =>{
		helixClient.CloseBondMarket(mint);
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
	const changeRebaseRate = async(new_rate) =>{
		helixClient.ChangeRebaseRate(new_rate);
	}
	const createBondSigner = async() =>{
		helixClient.CreateBondSigner();
	}
	const getTokenPrice = async(assetName, network) =>{
		return await helixClient.GetTokenPrice(assetName, network);
	}
	const fetchIdoAta = async() => {
		try{
			return await helixClient.FetchIdoAta();
		}catch(e){
			return undefined;
		}
	}
	const fetchIdoAccount = async() => {
		try{
			return await helixClient.FetchIdoAccount();
		}catch(e){
			console.log(e);
			return undefined;
		}
	}

	const createIdoAta = async() =>{
		await helixClient.CreateIdoAta();
	}

	return { 
		helixClient,
		stakeToken, 
		unstakeToken, 
		createUserAta, 
		createVault,
		closeVault,
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
		closeBondMarket,
		createHelixMint,
		governmentOwnedTokenAccount,
		multisigOwnedTokenAccount,
		mintToAccount,
		rebase,
		changeRebaseRate,
		createBondSigner,
		getTokenPrice,
		getBondAccount,
		fetchIdoAta,
		fetchIdoAccount,
		createIdoAta,
		createIdoAccount
	};
}