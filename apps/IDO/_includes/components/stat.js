import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";

/**
 * 
 * @param {string} props.statName 
 * @param {string} props.statValue
 * @param {*} props.statChange
 */
export default function Stat(props) {
	return(
		<div className="flex flex-col justify-start my-auto mx-8 md:mx-16">
			<h2 className="text-white md:mb-2 text-l">{props.statName}</h2>
			<div className="flex flex-row justify-between items-center">
				<span className="text-[#8C8C8C] font-bold text-xl md:text-3xl">
					$ {props.statValue || "N/A"}	
				</span>
			</div>
		</div>
	);
}