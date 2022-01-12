import React from "react";
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

export default function dashboardUi(props) {
	return(
		<div className="my-5 grid md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4">
		{
			props.protocolData?.map(function (protocol, index) {
				return(
					<div className="card bg-white col-span-1 row-span-1 m-2">
						<h3 className="text-left text-md text-gray8 mt-5 ml-10">
							{protocol.label}
						</h3>
						<div className="card-body">
							{typeof protocol.values === "undefined" ?
								(
									<div className="bg-gray6 rounded-md w-full h-24 animate-pulse" />
								) : (
									// TODO(millionz): make this functional lol
									<AreaChart data={protocol.values}>
										<XAxis dataKey="time" />
										<YAxis dataKey={protocol.label} />
									</AreaChart>	
								)
							}
						</div>
					</div>
				);
			})
		}
		</div>
	)
}