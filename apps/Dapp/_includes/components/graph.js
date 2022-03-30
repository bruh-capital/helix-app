import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/outline"
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { format } from "date-fns";

/**
 * @param {string} props.graphName
 * @param {string} props.currentValue	
 * @param {} props.graphChange
 * @param {} props.graphData
 * @param {string} props.dataFormat
 */
export default function Graph(props) {
	return(
		<div className="flex flex-col justify-start my-auto mx-8 md:mx-16 overflow-hidden">
			<h2 className="text-[#8C8C8C] dark:text-[#9E9E9E]">{props.graphName}</h2>
			<div className="flex flex-row items-center justify-between mb-4">
				<span className="text-[#474747] dark:text-white font-bold text-xl md:text-3xl">
					{props.currentValue || "N/A"}	
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
					!props.graphData ? (
						<div className="flex flex-grow rounded-lg bg-[#C0C0C0] dark:bg-[#3D3A45] animate-pulse w-full h-72 xl:h-96"/>
					) : (
						<ResponsiveContainer width="100%" height={500}>
							<AreaChart width={500} height={325} data={props?.graphData}>
								<defs>
									<linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#6D96FF" stopOpacity={0.8}/>
										<stop offset="95%" stopColor="#F948FD" stopOpacity={0.69}/>
									</linearGradient>
								</defs>
								<XAxis
									dataKey="timestamp"
									axisLine={false}
									tickLine={false}
									tickFormatter={str => format(new Date(str * 1000), "MMM dd")}
									padding={{ left: 5 }}
									reversed={true}
								/>
								<YAxis 
									dataKey={props.graphYAxis}
									axisLine={false}
									tickLine={false}
									width={props?.dataFormat === "percent" ? 33 : 55}
									tickFormatter={number =>
										number !== 0
										? props?.dataFormat !== "percent"
											? `${parseFloat(number) / 1000000}M`
											: `${trim(parseFloat(number), 2)}%`
										: ""
									}
									domain={[0, "auto"]}
									dx={2}
									allowDataOverflow={false}
								/>
								<Area type="monotone" dataKey={props.graphYAxis} stroke="#7879F1" fillOpacity={1} fill="url(#chartColor)" />
							</AreaChart>
						</ResponsiveContainer>
					)
				}
		</div>
	);
}