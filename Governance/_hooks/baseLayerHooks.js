import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { HelixNetwork } from "@baseutils/baseContractUtils";
import { useEffect, useMemo} from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useNotifications } from "reapop";

/**
 * Function that returns functions to use for helix
 * @returns {{bigass tuple of functions}}
 */
export default function HelixWrapper() {
	const { notify } = useNotifications();
	const wallet = useAnchorWallet();
	const [helixClient, setClient] = useState();

	useEffect(() => {
		if (!wallet || !wallet.publicKey) {
			return;
		}
		setClient(new HelixNetwork(wallet));
	},[wallet]); 

	const stakeToken = async (amount) => {
		try {
			await helixClient.Stake(amount);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Staking Failed"});
		}
	}
	
	const unstakeToken = async (amount) => {
		try {
			await helixClient.Unstake(amount);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Unstaking Failed"});
		}
	}

	const createUserAta = async () => {
		try {
			await helixClient.CreateUserATA();
		} catch(e) {
			notify(e.message.toString(), "error", {title: "ATA Creation Failed"});
		}
	}

	const createVault = async () => {
		try {
			await helixClient.InitializeUserVault();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Vault Creation Failed"});
		}
	}

	const createBondAccount = async() =>{
		try {
		 	await helixClient.InitBondAccount();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Bond Account Creation Failed"});
		}
	}

	const solBond = async(bond_price, maturity, connection) =>{
		try {
			await helixClient.SolBond(bond_price, maturity, connection);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "SOL Bond Creation Failed"});
		}
	}

	const splBond = async(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals) =>{
		try {
			await helixClient.SPLBond(bond_price, bond_maturity, tokenMintAddress, asset, connection, decimals);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "SPL Bond Creation Failed"});
		}
	}

	const redeemBonds = async() =>{
		try {
			await helixClient.RedeemBonds();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Bond Redemption Failed"});
		}
	}

	const collectCoupon = async() =>{
		try {
			await helixClient.CollectCoupon();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Coupon Collection Failed"});
		}
	}

	const changeLockupPeriod = async(duration) =>{
		try {
			await helixClient.ChangeLockup(duration);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Lockup Change Failed"});
		}
	}

	const mintAndCloseIdoAccount = async() =>{
		try {
			await helixClient.MintAndCloseIDO();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "IDO Mint and Close Failed"});
		}
	}

	const idoDeposit = async(amount) =>{
		try {
			await helixClient.IDODeposit(amount);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "IDO Deposit Failed"});
		}
	}

	const idoWithdraw = async(amount) =>{
		try {
			await helixClient.IDOWithdraw(amount);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "IDO Withdraw Failed"});
		}
	}

	const getTokenAccountBalance = async(mint_addr) =>{
		try {
			return await helixClient.GetTokenAccountBalance(mint_addr);
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Get Token Acct Balance Failed"});
		}
	}

	const getSolBalance = async() => {
		try {
			return await helixClient.GetSolBalance();
		} catch (e) {
			notify(e.message.toString(), "error", {title: "Get SOL Balance Failed"});
		}
	}

	const getBondMarketInfo = async(mint_addr) => {
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.FetchBondMarket(mint_addr);
		} catch(e){
			notify("Product: " + mint_addr + "\n" + e.message.toString(), "error", {title: "Get Bond Market Failed"});
		}
	}

	const getUserVault = async() =>{
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.FetchUserVault();
		}catch(e){
			notify(e.message.toString(), "error", {title: "Get User Vault Failed"});
		}
	}

	const getProtocolData = async() =>{
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.FetchProtocolData();
		}catch(e){
			notify(e.message.toString(), "error", {title: "Get Protocol Data Failed"});
		}
	}

	const getProposals = async(government) =>{
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.FetchProposals(government);
		}catch(e){
			notify(e.message.toString(), "error", {title: "Get Proposals Failed"});
		}
	}
	
	// CreateProposal

	const createProposal = async(government_address, title, description, expiration_weeks, pid, accs, data) =>{
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.CreateProposal(government_address, title, description, expiration_weeks, pid, accs, data);
		}catch(e){
			notify(e.message.toString(), "error", {title: "Create Proposal Failed"});
		}
	}

	const castVote = async(proposal, choice) =>{
		try{
			if (helixClient == undefined){
				return undefined
			};
			return await helixClient.CastVote(proposal, choice);
		}catch(e){
			notify(e.message.toString(), "error", {title: "Cast Vote Failed"});
		}
	}
	
	
	const createGovernemnt = async(governed_program_id) =>{
		try{
			helixClient.CreateGovernment(governed_program_id);
		}catch(e){
			notify("couldnt create government", "error");
		}
	}
	const createBondMarket = async (mint) =>{
		try{
			helixClient.CreateBondMarket(mint);
		}catch(e){
			notify("coult not CreateBondMarket", "error");
		}
	}
	const createHelixMint = async() =>{
		try{
			helixClient.CreateHelixMint();
		}catch(e){
			notify("coult not CreateHelixMint", "error");
		}
	}
	const governmentOwnedTokenAccount = async (mint, government) =>{
		try{
			helixClient.GovernmentOwnedTokenAccount(mint, government);
		}catch(e){
			notify("coult not GovernmentOwnedTokenAccount", "error");
		}
	}
	const multisigOwnedTokenAccount = async (mint) =>{
		try{
			helixClient.MultisigOwnedTokenAccount(mint);
		}catch(e){
			notify("coult not MultisigOwnedTokenAccount", "error");
		}
	}
	const mintToAccount = async(mintToAccount, amount) =>{
		try{
			helixClient.MintToAccount(mintToAccount, amount);
		}catch(e){
			notify("coult not MintToAccount", "error");
		}
	}
	const rebase = async() =>{
		try{
			helixClient.Rebase();
		}catch(e){
			notify("coult not Rebase", "error");
		}
	}
	const changeRebaseRate = async() =>{
		try{
			helixClient.ChangeRebaseRate();
		}catch(e){
			notify("coult not ChangeRebaseRate", "error");
		}
	}
	const createBondSigner = async() =>{
		try{
			helixClient.CreateBondSigner();
		}catch(e){
			notify("coult not CreateBondSigner", "error");
		}
	}

	return { 
		helixClient,
		stakeToken, 
		unstakeToken, 
		createUserAta, 
		createVault,
		createBondAccount, 
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

