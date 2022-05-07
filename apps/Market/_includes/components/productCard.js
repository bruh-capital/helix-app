import Image from 'next/image';

// TODO(millionz):
// this is something similar to the card elements on the div...
// you have been warned the asset URLs in here are just temps
// I'm going to try to come back to this once general layout is done

// todo (addendum from indy :P)
// 	on hover, make it pop up (increase width. add 1 to z index. add drop shadow + opacity)
export function ProductCard(props) {
	return(
		<div className="flex flex-col rounded-2xl ring-2 ring-inset ring-gray-800 w-[300px] h-[420px] relative overflow-hidden">
			<div className="flex flex-row justify-center relative top-0">
				<Image 
					src={props.imageLink}
					height={302}
					width={302}
					layout="fixed"
					objectFit='cover'
				/>
			</div>

			<div className="w-full absolute bottom-0 h-[120px]">

				<div className='flex flex-row content-center w-full bg-[#323232] h-[70px]'>
					<div className='flex flex-col h-full justify-center pl-4 '>
						<Image 
							src={props.profileLink}
							height={30}
							width={30}
							layout="fixed"
						/>
					</div>

					<div className='pl-4 flex flex-col justify-end gap-y-0 pb-2 h-full'>
						<div className='text-gray-200 opacity-80 text-sm'>
							@{props.username}
						</div>
						<div className='text-md'>
							{props.productName}
						</div>
					</div>
					<div className='w-1/4'></div>

					<div className='flex flex-col justify-end text-gray-200 text-md text-right opacity-80 pr-2 pb-1 grow opacity-50'>
						{props.price} SOL
					</div>
				</div>

				

				<div className='flex flex-row justify-content-center place-items-center align-center text-xs grow h-[50px]'>
					<div className='border-2 border-blue-500 rounded-2xl ml-4 pl-2 pr-2'>
						{props.productType}
					</div>
					<div className='w-2/3'></div>
					<div className='flex flex-row place-items-center text-center align-center'>
						{/* change this to button */}
						<button>
							<Image
								src={`/market/product/heart.png`}
								height={10}
								width={10}
								layout="fixed"
							/>
						</button>
						<div className='ml-2 mr-2'>
							{props.likes}
						</div>
					</div>
				</div>
			</div>

			
		</div>
	);
}