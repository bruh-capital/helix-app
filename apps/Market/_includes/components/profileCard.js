export default function ProfileCard(){
    return (
        <div className="flex flex-row">
            <div>
                {props.cardIndex}
            </div>
            <div>
                {/* TODO: fill with PFP maybe change this to image or summ. make sure it rounded tho */}
            </div>
            <div className="grid grid-rows-2">
                <div>
                    {props.sellerName}
                </div>
                <div>
                    {props.moneyAmount}
                </div>
            </div>
        </div>
    )
}