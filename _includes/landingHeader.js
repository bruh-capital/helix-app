import ConnectionButton from "@includes/wallet";

export default function LandingHeader(props) {	
	return(
		<div className='mx-auto px-16'>
			<div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
				<div className='flex justify-center lg:flex-1 lg:w-0'>
					<span 
						className="block text-white xl:inline text-xl lg:text-4xl font-bold mr-4"
						style={{textShadow: "0px 0px 10px rgba(256, 256, 256, 1)"}}
					>
						{props.title}
					</span>
				</div>
			</div>
		</div>
	);
}