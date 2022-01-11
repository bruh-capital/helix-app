import React from "react";

export default function dashboardUi(props) {
	return(
		<div className="py-5 grid md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4">
		{
			props.protocolData?.map(function (protocol, index) {
				console.log(protocol.label);
				return(
					<div className="bg-white">
						<span className="text-black font-bold text-3xl">
							{protocol.label}
						</span>
					</div>
				);
			})
		}
		</div>
	)
}