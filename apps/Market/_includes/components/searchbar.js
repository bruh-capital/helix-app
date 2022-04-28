import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Listbox, Popover } from "@headlessui/react";
import { useState } from "react";
import { atom, useRecoilValue } from "recoil";


// import {searchProducts}

function searchProducts(){

}

export default function Searchbar(props){
	const [searchQuery, setSearchQuery] = useState('');

	const [categoriesList, setCategoriesList] = useState([
		"all categories",
		"physical",
		"image",
		"audio",
		"video"
	]);

    const [categorySelection, setCategorySelection] = useState(categoriesList[0]);

    return (
        <div className='flex flex-row justify-evenly w-1/2 z-10 border-2 m-4 border-gray-200 rounded-xl'>
            <input
                type="text"
                placeholder="search in marketplace"
                className='bg-transparent grow m-2'
                value = {searchQuery}
                onChange = {(e)=>{setSearchQuery(e.target.value)}}
            />
            
            <div className='flex flex-row justify-evenly w-1/3'>
                <Listbox value={categorySelection} onChange={setCategorySelection}>
                    <Listbox.Button>
                        {categorySelection}
                    </Listbox.Button>
                    <Listbox.Options>
                    {categoriesList?.map((cat)=>{
                        return <Listbox.Option key={cat} value={cat}>
                            {({ active, selected }) => (
                                <li className={active ? 'bg-gray-800 text-white' : 'bg-gray-500 text-white'} >
                                    {selected && <CheckIcon
                                    width={10}
                                    height={10} />}
                                    {cat}
                                </li>
                            )}
                        </Listbox.Option>
                    })}
                    </Listbox.Options>
                </Listbox>
                
                <button
                    onClick = {()=>{searchProducts(searchQuery, categorySelection)}}
                    className = 'flex flex-row rounded-25 place-items-center text-xs gap-x-2'
                >
                    SEARCH

                    <SearchIcon
                        width={16}
                        height={16}
                    />
                </button>
            </div>
        </div>
    )
}