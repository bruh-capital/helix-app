import { useTheme } from "next-themes";

export default function Dash(props) {
	const { theme, setTheme } = useTheme();
	return(
		<div className="h-screen -mt-24 mx-auto content-center items-center" >
			<div className="grid grid-cols-2 grid-rows-2 mt-24 w-3/4 h-full">
				<div className="col-span-2 row-span-1 rounded-md bg-card1Bg bg-cover">
				</div>
				<div className="col-span-1 row-span-1 rounded-md">

				</div>
				<div className="col-span-1 row-span-1 rounded-md">

				</div>
			</div>
		</div>
	);
}