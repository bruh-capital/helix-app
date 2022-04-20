

export default function Header(props) {
	return(
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="flex mx-auto py-1 w-full bg-[#101317] text-white">
				Upper Header
			</div>
			<div className="flex mx-auto py-6 w-full bg-[#262626] text-white">
				Lower Header
			</div>
		</header>
	);
}