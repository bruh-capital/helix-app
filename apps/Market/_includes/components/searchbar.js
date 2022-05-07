import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Listbox, Transition} from "@headlessui/react";
import { useState, useContext} from "react";
import {MarketHelpers} from 'marketplace-clients';

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
        <div className='flex flex-row justify-evenly w-1/2 z-10 border-2 m-4 border-gray-200 rounded-xl min-h-max max-h-10 sm:w-5/6'>
            <input
                type="text"
                placeholder="search"
                className='bg-transparent focus:outline-none m-2 grow'
                onKeyPress={(e)=>{if(e.key=="Enter"){
                    switch(categorySelection){
                        case "physical":
                            MarketHelpers.GetProductsByKeywords(searchQuery, connection, "8mbKcSgQGHhsns3W4DkXpES2S3iRWh3FXphQdFZvfiLJ");
                            break;
                        case "digital":
                            MarketHelpers.GetProductsByKeywords(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii");
                            break;
                        case "audio":
                            MarketHelpers.GetProductsByKeywords(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 0);
                            break;
                        case "video":
                            MarketHelpers.GetProductsByKeywords(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 1);
                            break;
                        case "image":
                            MarketHelpers.GetProductsByKeywords(searchQuery, connection, "51SD4jGExq2GrtGZykE1RLfeUC16RiLEjJpHxpa7Qsii", 2);
                            break;
                    }
                }}}
                value = {searchQuery}
                onChange = {(e)=>{setSearchQuery(e.target.value)}}
            />
            
            <div className='flex flex-row justify-evenly w-1/5 sm:w-1/4'>
                <div className='w-2/3 h-full flex'>
                    <Listbox
                        as="div"
                        value={categorySelection}
                        onChange={setCategorySelection}
                        className="grid grid-cols-1 static h-full justify-center w-full"
                    >
                        <Listbox.Button className="flex flex-row place-items-center relative pb-2 pt-1 w-24">
                            {categorySelection}
                            <ChevronDownIcon
                                width={20}
                                height={20}
                            />
                        </Listbox.Button>
                        <Listbox.Options className="flex flex-col gap-y-1 pt-4 rounded-md w-24">
                        {categoriesList?.map((cat)=>{
                            return <Listbox.Option key={cat} value={cat}>
                                {({ active, selected }) => (
                                    <li className={"flex flex-row justify-center place-items-center rounded-md p-1 " + (active ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white')} >
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