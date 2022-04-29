import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Listbox } from "@headlessui/react";
import { useState } from "react";


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
        <div className='flex flex-row justify-evenly w-1/2 z-10 border-2 m-4 border-gray-200 rounded-xl min-h-max max-h-10'>
            <input
                type="text"
                placeholder="search in marketplace"
                className='bg-transparent focus:outline-none m-2 grow'
                value = {searchQuery}
                onChange = {(e)=>{setSearchQuery(e.target.value)}}
            />
            
            <div className='flex flex-row justify-evenly w-2/5'>
                <div className='max-w-xs w-full h-full flex'>
                    <Listbox
                        as="div"
                        value={categorySelection}
                        onChange={setCategorySelection}
                        className="space-y-2 grid grid-cols-1 static w-full h-full justify-center"
                    >
                        <Listbox.Button>
                            {categorySelection}
                        </Listbox.Button>
                        <Listbox.Options>
                        {categoriesList?.map((cat)=>{
                            return <Listbox.Option key={cat} value={cat}>
                                {({ active, selected }) => (
                                    <li className={"flex flex-row justify-center place-items-center gap-x-2 " + (active ? 'bg-gray-800 text-white' : 'bg-gray-500 text-white')} >
                                        {selected && <CheckIcon width={10} height={10}/>}
                                        {cat}
                                    </li>
                                )}
                            </Listbox.Option>
                        })}
                        </Listbox.Options>
                    </Listbox>
                </div>
                
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