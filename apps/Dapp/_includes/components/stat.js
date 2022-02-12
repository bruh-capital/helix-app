import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";

/**
 * 
 * @param {string} props.statName 
 * @param {string} props.statValue
 * @param {*} props.statChange
 */
export default function Stat(props) {
	return(
		<div className="flex flex-col justify-start my-auto mx-16">
			<h2 className="text-[#8C8C8C] dark:text-[#9E9E9E] mb-2">{props.statName}</h2>
			<div className="flex flex-row justify-between items-center">
				<span className="text-[#474747] dark:text-white font-bold text-xl md:text-3xl">
					{props.statValue || "N/A"}	
				</span>
				{
						(props?.statChange && props.statChange >= 0)  ? (
							<div className="flex flex-row">
								<span className="text-green-800">{(props?.statChange || "N/A") + "%"}</span>
								<ArrowSmUpIcon className="h-4 w-4 text-green-800"/>
							</div>
						) : (
							<div className="flex flex-row">
								<span className="text-red-800">{(props?.statChange || "N/A") + "%"}</span>
								<ArrowSmDownIcon className="h-4 w-4 text-red-800"/>
							</div>
						)
				}
			</div>
		</div>
	);
}