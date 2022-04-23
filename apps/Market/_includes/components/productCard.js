import Image from 'next/image';

// TODO(millionz):
// this is something similar to the card elements on the div...
// you have been warned the asset URLs in here are just temps
// I'm going to try to come back to this once general layout is done

// todo (addendum from indy :P)
// 	on hover, make it pop up (increase width. add 1 to z index. add drop shadow + opacity)
export function productCard(props) {
	return(
		<div className="flex flex-col">

			<div className="justify-center basis-1/4 align-middle my-auto justify-center place-content-center">
				<Image 
				// make file url from downloaded image (u can do this from file browser api. frgt how)
					src={props.image}
					height={150}
					width={155}
					layout="fixed"
				/>
			</div>

			<div className="flex flex-row justify-center place-content-center">
				<Image 
					src="some-image.png"
					height={75}
					width={78}
					layout="fixed"
				/>

				<div className='grid grid-cols-1 grid-rows-2'>
					<div>
						{props.username}
					</div>
					<div>
						{props.productName}
					</div>
				</div>

				<div>
					{props.price} SOL
				</div>
			</div>

			<div className='flex flex-row justify-content-center place-items-center align-center'>
				<div>
					<Image
						src={`/marketassets/product/${props.productType}.png`}
						height={150}
						width={155}
						layout="fixed"
					/>
				</div>
				<div>
					<Image
						src={`/marketassets/icons/hearticon.png`}
						height={150}
						width={155}
						layout="fixed"
					/>
					{props.likes}
				</div>
			</div>
		</div>
	);
}