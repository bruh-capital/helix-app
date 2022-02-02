import Image from "next/image";
import { Menu } from "@headlessui/react";

export default function Header(props) {
	return(
		<div className="sticky bg-transparant">
			<div className="mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-4 md:space-x-10">
					<div className="flex justify-start">
						<Image
							src="/icons/helixicon_post.png"
							height={90}
							width={90}
						/>
						<h1 className="font-junegul"></h1>
					</div>
					<div className="flex justify-center space-x-4">
						<button className="">Staking</button>
						<button>Bonding</button>
						<button>Governance</button>
						<Menu>
							<Menu.Button>More</Menu.Button>
							<Menu.Item disabled>
								{({ active }) => (
									<a
										href="#"
										className={`${active && 'bg-blue-500'}`}
									>
										Helix
									</a>
								)}
							</Menu.Item>
							<Menu.Item disabled>
								{({ active }) => (
									<a
										href="#"
										className={`${active && 'bg-blue-500'}`}
									>
										Rocks
									</a>
								)}
							</Menu.Item>
						</Menu>
					</div>
				</div>
			</div>
		</div>
	);
}