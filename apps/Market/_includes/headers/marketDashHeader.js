import Logo from "@includes/components/logo";

export default function MarketDashHeader(props) {
	return(
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="flex mx-auto py-1 w-full bg-[#101317] text-white">
				Lower Helix Market Header
			</div>
			<div className="flex mx-auto w-full bg-[#262626] text-white">
				<Logo/>
			</div>
		</header>
	);
}