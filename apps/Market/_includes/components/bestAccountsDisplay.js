import ProfileCard from "@includes/components/profileCard";

export default function BestAccountsDisplay(props){
    return(
        <div>
            {/* title div */}
            <div>
            {props.title}
            </div>
            {/* content */}
            <div className="grid grid-cols-2 grid-rows-3">
            {props.accounts.map((account, i)=>{
                <ProfileCard
                    cardIndex = {i}
                    username = {account.username}
                    moneyAmount = {account.moneyAmount}
                    imageLink = {account.imageLink}
                />
            })}
            </div>
        </div>
    )
}
