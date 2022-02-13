import { InformationCircleIcon } from "@heroicons/react/outline";

export default function Stake(props) {
	return(
		<div className="h-screen -mt-24 content-center items-center pt-32 md:pt-36 pb-24">
			<div className="flex flex-col md:px-24 xl:px-32 2xl:px-52">
				<div className="flex flex-row justify-items-start rounded-xl bg-[#D9D8E2] dark:bg-[#191B1F] border-2 border-[#BABABA] dark:border-[#383838]">
					<div className="rounded-xl p-2 m-2 bg-[#EEEEEE] bg-opacity-60 dark:bg-[#383838]">
						<InformationCircleIcon className="h-5 w-5"/>
					</div>
					<div className="font-medium text-[#606060] dark:text-[#7C849A] my-auto">
						Note: The "Configure" transaction is only needed when interacting for the first time.
					</div>
				</div>
			</div>
		</div>
	);
}