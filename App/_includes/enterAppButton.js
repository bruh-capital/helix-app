import Link from "next/link";

export default function EnterAppButton(props) {
	return(
		<Link href={"./app"}>
			<button className="btn btn-secondary">
				Lauch App
			</button>
		</Link>
	);
}