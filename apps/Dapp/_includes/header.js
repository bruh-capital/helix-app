import Image from "next/image";
import { useTheme } from 'next-themes';
import { useContext } from "react";
import LayoutContext from "@context/layoutContext";

export default function Header(props) {
	const { theme, setTheme } = useTheme();
	const { layout, setLayout } = useContext(LayoutContext);

	return(
		<div className="static bg-[#E1E1E1] dark:bg-[#191B1F] z-50">
			<div className="mx-auto">
				<div className="flex flex-row justify-between">
					<div className="flex h-full justify-self-start justify-around">
						<Image 
							src={ 
								"/dapp-assets/Logo/" + 
								(theme == "light"? 
								"lightmode.png":
								"Darkmode.png")
							}
							height={89}
							width={159}
							layout="fixed"
						/>
						<div className="flex flex-row m-6 ml-16 align-items-middle space-x-14">
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "dashboard"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#404040] dark:text-white dark:bg-opacity-75":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Dashboard</button>
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "stake"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#404040] dark:text-white dark:bg-opacity-75":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Stake</button>
						<button
							className={
								"rounded-lg px-4 m-5" +
								(layout == "bond"?
									"text-md bg-[#C8C7CA] text-black font-bold dark:bg-[#404040] dark:text-white dark:bg-opacity-75":
									"text-md bg-transparent text-[#949494] font-md"
								) 
							}
						>Bond</button>
						</div>
					</div>
					<div className="flex justify-self-end h-full text-white text-md font-bold">
					</div>
				</div>
			</div>
		</div>
	);
}