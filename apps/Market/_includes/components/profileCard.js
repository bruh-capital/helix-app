import Image from "next/image"

export default function ProfileCard(props){
    return (
        <div className="flex flex-row">
            <div className="p-2">
                {props.cardIndex}
            </div>
            <div className="flex flex-col justify-center p-2">
                <Image
                    src = {props.imageLink}
                    width = {30}
                    height = {30}
                />
            </div>
            <div className="grid grid-rows-2 text-sm">
                <div>
                    {props.username}
                </div>
                <div className="opacity-80 text-gray-200 text-xs">
                    {props.moneyAmount} SOL
                </div>
            </div>
        </div>
    )
}