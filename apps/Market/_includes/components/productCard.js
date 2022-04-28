import Image from 'next/image';

// TODO(millionz):
// this is something similar to the card elements on the div...
// you have been warned the asset URLs in here are just temps
// I'm going to try to come back to this once general layout is done

// todo (addendum from indy :P)
// 	on hover, make it pop up (increase width. add 1 to z index. add drop shadow + opacity)
export function ProductCard(props) {
	return(
		<div className="flex flex-col rounded-2xl border-2 w-full">

			<div className="flex flex-row justify-center">
				<Image 
					src={props.imageLink}
					height={150}
					width={150}
					layout="fixed"
				/>
			</div>

			<div className="border-2 flex flex-row content-center w-full">
				<div className='flex flex-col h-full justify-center pl-2 '>
					<Image 
						src={props.profileLink}
						height={30}
						width={30}
						layout="fixed"
					/>
				</div>

				<div className=' pl-2 grid grid-cols-1 grid-rows-2 '>
					<div className='text-gray-200 opacity-80'>
						@{props.username}
					</div>
					<div>
						{props.productName}
					</div>
				</div>
				<div className='w-1/4'></div>

				<div className='flex flex-col justify-end text-gray-200 text-xs opacity-80 pb-2'>
					{props.price} SOL
				</div>
			</div>

			<div className='flex flex-row justify-content-center place-items-center align-center text-xs pt-1 pb-1 '>
				<div className='border-2 border-blue-500 rounded-md ml-4 pl-2 pr-2'>
					{props.productType}
				</div>
				<div className='w-2/3'></div>
				<div className='flex flex-row place-items-center text-center align-center'>
					<Image
						src={`/market/product/heart.png`}
						height={10}
						width={10}
						layout="fixed"
					/>
					<div className='ml-2 mr-2'>
						{props.likes}
					</div>
				</div>
			</div>
		</div>
	);
}