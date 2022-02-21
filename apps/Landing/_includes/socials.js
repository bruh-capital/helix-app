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
            <div className="flex flex-col justify-center place-items-center justify-items-center my-auto items-center basis-1/2 gap-y-3 w-full h-1/3">
                <SocialsCard
                    title="Twitter"
                    description="Stay up to date on latest news, releases, and updates."
                    link="https://twitter.com/Helix_DAO"
                    image={
                        <Image
                            src="/icons/bigtwitter.png"
                            height={50}
                            width={60}
                            layout="fixed"
                        />
                    }
                />
                <SocialsCard
                    title="Discord"
                    description="Chat with the community"
                    link="https://discord.com/invite/rR6M38QT3n"
                    image={
                        <Image
                            src="/icons/bigdiscord.png" 
                            height={45}
                            width={60}
                            layout="fixed"
                        />
                    }
                />
                <SocialsCard
                    title="GitHub"
                    description="Interested in code? Helix is open source"
                    link="https://github.com/bruh-capital"
                    image={
                        <Image
                            src="/icons/biggit.png"
                            height={60}
                            width={60}
                            layout="fixed"
                        />
                    }
                />
                <SocialsCard
                    title="Medium"
                    description="Read all the technicals at Helix"
                    link="https://helixdao.medium.com/"
                    image={
                        <Image
                            src="/icons/bigmedium.png"
                            width={60}
                            height={60}
                            layout="fixed"
                        />
                    }
                />
			</div>
		</div>
	);
}