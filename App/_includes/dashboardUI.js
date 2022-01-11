import React from "react";

export default function dashboardUi(props) {
	return(
		<div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-1 sm:grid-rows-4">
		{
			props.protocolData?.map((protocol, index) => {
				<div className="card">
					fuck
				</div>
			})
		}
		</div>
	)
}