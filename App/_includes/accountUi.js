/* this is a temp file until I can figure out how to call in a less obtrusive manner */
import HelixWrapper from "@hooks/baseLayerHooks";

export default function AccountUI(props) {
	const {
		stakeToken,
		unstakeToken,
		createUserAta,
		createVault,
		makeBond,
		redeemBond 
	} = HelixWrapper();

	return(
		<div className="bg-white rounded-box py-5">
			<h2 className="card-title">User Accounts</h2>
			<button
				className="btn btn-primary mx-2"
				onClick={() => createUserAta()}
			>Create Account</button>
			<button
				className="btn btn-primary mx-2"
				onClick={() => createVault()}
			>Create Vault</button>
		</div>
	);
}