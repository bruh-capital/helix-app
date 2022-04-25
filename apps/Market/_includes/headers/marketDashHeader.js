import Logo from "@includes/components/logo";
import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";

// import {searchProducts}

function searchProducts(){

}

export default function MarketDashHeader(props) {
	const [categorySelection, setCategorySelection] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

	const categoriesAtom = atom({
		key:"categories",
		default:props.productCategories
	})

	const categoriesList = useRecoilValue(categoriesAtom);

	return(
		<header className="sticky top-0 z-50 flex flex-col w-full">
			<div className="flex mx-auto py-1 w-full bg-[#101317] text-white">
				Lower Helix Market Header
			</div>
			<div className="flex mx-auto w-full bg-[#262626] text-white">
				<Logo/>

				<div>
					<input
						type="text"
						placeholder="search in marketplace"
						value = {searchQuery}
						onChange = {(e)=>{setSearchQuery(e.target.value)}}
					/>
					<Listbox value={categorySelection} onChange={setCategorySelection}>
						<Listbox.Button>
							{categorySelection}
						</Listbox.Button>
						<Listbox.Options>
						{categoriesList.map((cat)=>{
							<Listbox.Option key={cat} value={cat}>
								{({ active, selected }) => (
									<li className={active ? 'bg-gray-800 text-white' : 'bg-gray500 text-white'} >
										{selected && <CheckIcon />}
										{cat}
									</li>
								)}
							</Listbox.Option>
						})}
						</Listbox.Options>
					</Listbox>
					
					<button
						onClick = {()=>{searchProducts(searchQuery, categorySelection)}}
						className = 'rounded-25'
					>
						<SearchIcon/>
						SEARCH
					</button>
				</div>


			</div>
		</header>
	);
}

export async function getStaticProps(){
	const productCategories = [
		"all categories",
		"physical",
		"image",
		"audio",
		"video"
	];
	return { props: { productCategories } };
}