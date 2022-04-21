import Logo from "@includes/components/logo";

// this is the thin black bar on the top
export default function GlobalHeader(props) {
	return(
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="flex mx-auto py-1 w-full bg-[#101317] text-white">
				Upper Header
			</div>
			{props.children}
		</header>
	);
}