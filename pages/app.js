import ReserveLayout from "@layouts/reserve";
import StakeInterface from "@includes/stakeUi";
import { ToastContainer } from "react-toastify";

export default function AppPage() {
	return(
		<ReserveLayout title={"app"}>
			<ToastContainer/>
			<StakeInterface/>
		</ReserveLayout>
	)
}