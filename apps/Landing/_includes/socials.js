import Image from "next/image";
import SocialsCard from "@includes/components/socialsCard";

export default function Socials(props) {
	return(
		<div className="flex flex-row justify-around w-11/12 md:w-3/5 h-screen mx-auto gap-x-8">
			<div className="flex flex-col justify-center items-center basis-1/2 h-1/12 my-auto">
				<div className="flex font-bold text-white text-2xl md:text-6xl basis-2/3 text-left pb-4">
					Keep in touch with us!
				</div>
				<div className="flex font-semibold text-xs md:text-xl text-[#7E8083] text-left">Join the community and stay up to date on what's happening in Helix</div>
			</div>
            <div className="flex flex-col justify-center items-center basis-1/2 gap-y-3 w-full">
                <a className="w-full h-full basis-1/4" href="https://twitter.com/Helix_DAO" target="_blank">
                    <div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010] py-5 hover:shadow-gray-glow-md hover:ease-in duration-100">
                        <div className="flex flex-row h-10 w-12 mt-2">
                            <Image
                                src="/icons/bigtwitter.png"
                                height={35}
                                width={35}
                                layout="fixed"
                            />
                        </div>
                        <div className="flex flex-col justify-center text-left">
                            <div className="flex flex-col mx-6">
                                <div className="text-s">
                                    Twitter
                                </div>
                                <div className="text-xs">
                                    Follow to stay updated on latest news, release, and updates.
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <SocialsCard
                    title="Discord"
                    description="Chat with the community"
                    link="https://discord.com/invite/rR6M38QT3n"
                    image={
                        <Image
                            src="/icons/bigdiscord.png" 
                            height={57}
                            width={80}
                            layout="fixed"
                        />
                    }
                />
                <a className="w-full h-full basis-1/4" target="_blank" href="https://github.com/bruh-capital">
                    <div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010] py-5  hover:shadow-gray-glow-md hover:ease-in duration-100">
                        <div className="flex flex-row h-10 w-12 mt-2">
                            <Image
                                src="/icons/biggit.png"
                                height={35}
                                width={35}
                                layout="fixed"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-full text-left">
                            <div className="flex flex-col mx-6">
                                <div className="font-md font-mono font-family:ui-monospace text-s">
                                    Github
                                </div>
                                <div className="text-xs">
                                    Interested in the code? Helix open sources it's app and projects.
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
				
                <a className="w-full h-full basis-1/4" href="https://helixdao.medium.com/" target="_blank">
                    <div className="flex flex-row px-2 w-full rounded-lg text-white bg-[#101010] py-5 hover:shadow-gray-glow-md hover:ease-in duration-100">
                        <div className="flex flex-row h-10 w-12">
                            <Image
                                src="/icons/bigmedium.png"
                                height={35}
                                width={35}
                                layout="fixed"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-full text-left">
                            <div className="flex flex-col mx-6">
                                <div className="font-md font-mono font-family:ui-monospace text-s">
                                    Medium
                                </div>
                                <div className="text-xs">
                                    Read the technicals
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
			</div>
		</div>
	);
}