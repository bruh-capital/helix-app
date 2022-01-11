import React from "react";

export default function dashboardUi(props) {
	return(
		<div className="py-5 grid md:grid-cols-2 space-x-2 space-y-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4">
		{
			props.protocolData?.map(function (protocol, index) {
				console.log(protocol.label);
				return(
					<div className="card bg-white col-span-1 row-span-1">
						<h3 className="text-md text-gray8">
							{protocol.label}
						</h3>
						<div className="card-body">
							{protocol.values === undefined ?
								(
									<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"/>
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