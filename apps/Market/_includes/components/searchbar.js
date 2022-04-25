import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Listbox, Popover } from "@headlessui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";


// import {searchProducts}

function searchProducts(){

}

export default function Searchbar(props){
    const [categorySelection, setCategorySelection] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

	const categoriesAtom = atom({
		key:"categories",
		default:props.productCategories
	})

	const categoriesList = useRecoilValue(categoriesAtom);

    return (
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
    )
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