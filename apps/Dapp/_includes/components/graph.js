import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/outline"

/**
 * @param {string} props.graphName
 * @param {string} props.currentGraphValue
 * @param {} props.
 * @param {} props.graphData
 */
export default function Graph(props) {
	return(
		<div className="flex flex-col justify-start my-auto mx-16">
			<h2 className="text-[#8C8C8C] dark:text-[#9E9E9E] mb-2">{props.graphName}</h2>
			<div className="flex flex-row items-center justify-between mb-4">
				<span className="text-[#474747] dark:text-white font-bold text-xl md:text-3xl">
					{props.graphCurrentValue || "N/A"}	
				</span>
				<div>
					{
						(props?.graphChange && props.graphChange >= 0)  ? (
							<div className="flex flex-row">
								<span className="text-green-800">{(props?.graphChange || "N/A") + "%"}</span>
								<ArrowSmUpIcon className="h-4 w-4 text-green-800"/>
							</div>
						) : (
							<div className="flex flex-row">
								<span className="text-red-800">{(props?.graphChange || "N/A") + "%"}</span>
								<ArrowSmDownIcon className="h-4 w-4 text-red-800"/>
							</div>
						)
					}
				</div>
			</div>
			<div className="flex-grow">
				{
					props.graphData ? (
						<div className="flex flex-grow bg-[#C0C0C0] animate-pulse px-24"/>
					) : (
						<div className="rounded-md bg-[#C0C0C0] dark:bg-[#3D3A45] animate-pulse px-24 py-48 m-auto"></div>
					)
				}
			</div>
		</div>
	);
}