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
						<h3 className="text-md text-gray8">
							{protocol.label}
						</h3>
						<div className="card-body">
							{typeof protocol.values === "undefined" ?
								(
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path className="opacity-75" fill="#8392ab" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								) : (
									<span>Graph Goes here lol</span>
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