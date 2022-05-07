import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Logo(props) {
	let theme = useTheme();

	// todo: add an onclick take u to dash
	return(
		<div className="flex items-center flex-auto">
			<Image 
				src={ 
					"/3d/" + 
					(theme == "light" ? 
					"4K_3D_black.png":
					"4k_3D_white.png")
				}
				height={60}
				width={60}
				layout="fixed"
			/>
			<div className="hidden sm:flex sm:text-2xl md:text-3xl my-auto -ml-3 text-[#3E3E3E] dark:text-white font-[Junegull] align-center text-center">
				HELIX
			</div>
		</div>
	);
}