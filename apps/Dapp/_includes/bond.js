import Graph from "@includes/components/graph";

export default function Bond(props) {
	return(
		<div className="-mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="grid gap-x-12 grid-cols-2 grid-rows-6 lg:grid-rows-4 w-full px-8 md:px-24 xl:px-32 2xl:px-64 h-full justify-around">
				<div className="flex col-start-1 py-6 row-start-1 flex-col col-span-1 lg:col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph 
						graphName="Total Value Deposited"
					/>
				</div>
				<div className="flex col-start-2 py-6 row-start-1 flex-col col-span-1 lg:col-span-1 row-span-3 rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<Graph 
						graphName="HLX Price"
					/>
				</div>
			</div>
			<div className="flex flex-col  md:px-24 xl:px-32 2xl:px-64">
				<div className="rounded-xl border-2 border-[#A5A5A5] dark:border-[#383838] bg-[#D9D8E2] dark:bg-[#191B1F]">
					<div className="text-2xl text-[#4B4B4B] dark:text-white pl-10 md:pl-16 pt-10"></div>
					<table>
						<tr>
							<th>Accepted Asset</th>
							<th>Price</th>
							<th>ROI</th>
							<th></th>
						</tr>
						{props.bondItems?.map((bond, index) => (
							<tr>
								<td>{bond.asset}</td>
								<td>{bond.roi}</td>
								<td>{bond.price}</td>
								<td>
									<BondModalButton 
										tokenAddress={bond.tokenAddress}	
									/>
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	);
}