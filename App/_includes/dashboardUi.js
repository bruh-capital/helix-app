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
		<div className="py-5 grid md:grid-cols-2 space-x-2 space-y-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4">
		{
			props.protocolData?.map(function (protocol, index) {
				console.log(protocol.label);
				console.log(typeof protocol.values);
				return(
					<div className="card bg-white col-span-1 row-span-1">
						<h3 className="text-left text-md text-gray8 mt-5 ml-10">
							{protocol.label}
						</h3>
						<div className="card-body">
							{typeof protocol.values === "undefined" ?
								(
									<div className="bg-gray6 rounded-md w-full h-24 animate-pulse"></div>
								) : (
									<AreaChart data={}>

									</AreaChart>	
									//<span>Graph Goes here lol</span>
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