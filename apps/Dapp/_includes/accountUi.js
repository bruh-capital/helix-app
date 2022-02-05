/* this is a temp file until I can figure out how to call in a less obtrusive manner */
import helixContext from "@context/helixClientContext";
import { useContext } from "react";

export default function AccountUI(props) {
	const {client} = useContext(helixContext);

	return(
		<div className="bg-white rounded-box py-5">
			<h2 className="card-title">User Accounts</h2>
			<button
				className="btn btn-primary mx-2"
				onClick={() => client.createUserAta()}
			>Create Account</button>
			<button
				className="btn btn-primary mx-2"
				onClick={() => {
					client.createVault()
				}}
			>Create Vault</button>
		</div>
	);
}