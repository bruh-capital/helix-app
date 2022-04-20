import Image from 'next/image';

export default function Logo(props) {
	// for now we're just going to use dark theme
	let theme = "dark";

	return(
		<div className="flex items-center flex-auto">
			<Image 
				src={ 
					"/3d/" + 
					(theme == "light" ? 
					"4K_3D_black.png":
					"4k_3D_white.png")
				}
				height={90}
				width={90}
				layout="fixed"
			/>
			<div className="hidden sm:flex sm:text-2xl md:text-4xl my-auto -ml-3 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">
				HELIX
			</div>
		</div>
	);
}