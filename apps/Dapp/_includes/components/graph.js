import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/outline"
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

/**
 * @param {string} props.graphName
 * @param {string} props.currentGraphValue
 * @param {} props.graphChange
 * @param {} props.graphData
 */
export default function Graph(props) {
	return(
		<div className="flex flex-col justify-start my-auto mx-8 md:mx-16 overflow-hidden">
			<h2 className="text-[#8C8C8C] dark:text-[#9E9E9E] md:mb-2">{props.graphName}</h2>
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
				{
					props.graphData ? (
						<div className="flex flex-grow bg-[#C0C0C0] animate-pulse"/>
					) : (
						<div className="rounded-md flex bg-[#C0C0C0] dark:bg-[#3D3A45] animate-pulse w-full h-32 md:h-36 lg:h-80">
							<AreaChart>
								<XAxis dataKey="time" />
								<YAxis dataKey={protocol.label} />
							</AreaChart>
						</div>
					)
				}
		</div>
	);
}