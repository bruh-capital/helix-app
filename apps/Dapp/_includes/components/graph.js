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
 * @param {string} props.dataFormat
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
					!props.graphData ? (
						<div className="flex flex-grow bg-[#C0C0C0] dark:bg-[#3D3A45] animate-pulse w-full h-72 xl:h-96"/>
					) : (
						<div className="rounded-md flex bg-[#C0C0C0]">
							<AreaChart data={props?.graphData}>
								<defs>
									<linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#6D96FF" stopOpacity={0.8}/>
										<stop offset="95%" stopColor="#F948FD" stopOpacity={0.69}/>
									</linearGradient>
								</defs>
								<XAxis
									dataKey="timestamp"
									interval={30}
									axisLine={false}
									tickLine={false}
									tickFormatter={str => format(new Date(str * 1000), "MMM dd")}
									reversed={true}
									padding={{ right: 20 }}
								/>
								<YAxis 
									dataKey={props.graphName}
									tickCount={3}
									axisLine={false}
									tickLine={false}
									width={props?.dataFormat === "percent" ? 33 : 55}
									tickFormatter={number =>
										number !== 0
										? props?.dataFormat !== "percent"
											? `${formatCurrency(parseFloat(number) / 1000000)}M`
											: `${trim(parseFloat(number), 2)}%`
										: ""
									}
									domain={[0, "auto"]}
									dx={3}
									allowDataOverflow={false}
								/>
								<Tooltip />
								<Area type="monotone" dataKey={props.graphName} stroke="#7879F1" fillOpacity={1} fill="url(#chartColor)" />
							</AreaChart>
						</div>
					)
				}
		</div>
	);
}