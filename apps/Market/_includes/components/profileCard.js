import Image from "next/image"

export default function ProfileCard(props){
    console.log(props);
    return (
        <div className="flex flex-row">
            <div>
                {props.cardIndex}
            </div>
            <div>
                <Image
                    src = {props.imageLink}
                    width = {150}
                    height = {150}
                />
            </div>
            <div className="grid grid-rows-2">
                <div>
                    {props.username}
                </div>
                <div>
                    {props.moneyAmount}
                </div>
            </div>
        </div>
    )
}