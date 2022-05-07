import Image from "next/image"

export default function ProfileCard(props){
    return (
        <div className="flex flex-row">
            <div className="p-2 font-bold h-full flex flex-col justify-center">
                {props.cardIndex}
            </div>
            <div className="flex flex-col justify-center p-2">
                <Image
                    src = {props.imageLink}
                    width = {60}
                    height = {60}
                />
            </div>
            <div className="flex flex-col text-md gap-y-0 justify-center">
                <div className="font-semibold sm:font-normal lg:text-xl">
                    {props.username}
                </div>
                <div className="opacity-80 text-gray-200 text-sm lg:font-normal lg:text-lg">
                    {props.moneyAmount} SOL
                </div>
            </div>
        </div>
    )
}