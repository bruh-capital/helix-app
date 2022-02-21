import { loadGetInitialProps } from "next/dist/shared/lib/utils";

export default function FeatureCard(props) {
	return(
		<div className="p-4 basis-1/3 bg-[#101010] rounded-lg">
			<div className="hidden md:flex items-center justify-center align-middle content-center">
				{props.image}
			</div>
			<div className="font-bold text-xl md:text-2xl text-white m-1">{props.title}</div>
			<div className="text-xs md:text-base leading-none text-[#ABABAB] m-1">{props.paragraph}</div>
		</div>
	);
}