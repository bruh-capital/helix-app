import ProfileCard from "@includes/components/profileCard";

export default function BestAccountsDisplay(props){
    console.log("accounts", props);
    return(
        <div className="">
            {/* title div */}
            <div className="p-4 text-2xl font-bold lg:text-4xl">
                {props.title}
            </div>
            {/* content */}
            <div className="grid grid-cols-2 grid-rows-3 gap-y-2 md:gap-y-4 lg:gap-y-6 xl:gap-y-8">
                {props.accounts.map((account, i)=>{
                    return <ProfileCard
                        cardIndex = {i+1}
                        username = {account.username}
                        moneyAmount = {account.moneyAmount}
                        imageLink = {account.imageLink}
                    />
                })}
            </div>
        </div>
    )
}
