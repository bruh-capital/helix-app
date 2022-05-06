import { CheckIcon, SearchIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Listbox } from "@headlessui/react";
import { useState, useContext} from "react";
import MarketHelpers from 'marketplace-clients';

import ConnectionCtx from '@contexts/connectionCtx';

export default function Searchbar(props){
	const [searchQuery, setSearchQuery] = useState('');
    const {connection, setConnection} = useContext(ConnectionCtx);

	const [categoriesList, setCategoriesList] = useState([
		"physical",
        "digital",
        "audio", // 0
        "video", // 1
		"image", // 2
	]);

    const [categorySelection, setCategorySelection] = useState(categoriesList[0]);

    return (
        <div className='flex flex-row justify-evenly w-1/2 z-10 border-2 m-4 border-gray-200 rounded-xl min-h-max max-h-10'>
            <input
                type="text"
                placeholder="search in marketplace"
                className='bg-transparent focus:outline-none m-2 grow'
                onKeyPress={(e)=>{if(e.key=="Enter"){
                    switch(categories){
                        case "physical":
                            MarketHelpers.searchProducts(searchQuery, connection, "8mbKcSgQGHhsns3W4DkXpES2S3iRWh3FXphQdFZvfiLJ");
                            break;
                        case "digital":
                            MarketHelpers.searchProducts(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii");
                            break;
                        case "audio":
                            MarketHelpers.searchProducts(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 0);
                            break;
                        case "video":
                            MarketHelpers.searchProducts(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 1);
                            break;
                        case "image":
                            MarketHelpers.searchProducts(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 2);
                            break;
                    }
                }}}
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
            </div>
        </div>
    )
}