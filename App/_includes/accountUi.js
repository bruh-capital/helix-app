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
		<div
			style={{boxShadow: "0px 0px 12px rgba(256, 256, 256, 1)"}}
			className="bg-white rounded-box py-5"
		>
			<h3 className="font-bold text-black pb-2">User Accounts</h3>
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