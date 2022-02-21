export default function SocialsCard(props) {
	return(
		<a className="flex w-full h-full basis-1/4 items-center content-center" target="_blank" href={props.link}>
			<div className="flex flex-row p-3 w-full rounded-lg text-white bg-[#101010] m-auto content-center hover:shadow-gray-glow-md hover:ease-in-out duration-400">
				<div className="flex flex-row text-center m-auto">
					{props.image}
				</div>
				<div className="flex flex-col justify-center w-full text-left">
					<div className="flex flex-col mx-6">
						<div className="font-md text-s">
							{props.title}
						</div>
						<div className="text-xs">
							{props.description}
						</div>
					</div>
				</div>
			</div>
		</a>
	);
}