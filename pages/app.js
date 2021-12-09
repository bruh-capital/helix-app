import ReserveLayout from "@layouts/reserve";
import StakeInterface from "@includes/stakeUi";

export default function AppPage() {
	return(
		<ReserveLayout title={"app"}>
			<StakeInterface/>
		</ReserveLayout>
	)
}