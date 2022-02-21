import Image from "next/image";
import FeatureCard from "@includes/components/featureCard";

export default function Feature(props) {
	return(
		<div className="h-screen flex overflow-hidden">
			<div className="m-auto flex flex-col content-center">
				<h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-5">Helix<br/>Branches</h1>
				<div className="w-full justify-around mb-10">
					<div className="text-gray-500 text-xs md:text-xl font-medium md:font-bold text-center">
						Helix revenue streams are designed with modularity in mind <br/> Adding new programs is as simple as plug and play
					</div>
				</div>
				{/* Add something here to show details on click for mobile layout */}

				<div className="flex flex-col w-11/12 mx-auto md:flex-row gap-y-4 md:gap-x-8">
					<FeatureCard 
						title="Governance"
						paragraph="Governments and subgovernments allow your voice to be heard accross multiple projects. Submit proposals and fund ventures, we build helix together."
						image={
							<Image 
								src="/landingassets/landingpage/3d_icons/govt.png"
								height={150}
								width={150}
								layout="fixed"
							/>
						}
					/>
					<FeatureCard 
						title="Revenue"
						paragraph="From delta-neutral strategies to privacy apps, Helix builds platforms that make the treasury number go up. Now you can finally touch that grass while stacking rewards."
						image={
							<Image 
								src="/landingassets/landingpage/3d_icons/money.png"
								height={150}
								width={150}
								layout="fixed"
							/>
						}
					/>
					<FeatureCard 
						title="Marketplace"
						paragraph="A P2P marketplace for both physical and digital goods that keeps you and your items hidden from weirdos like third parties. If you can prove it you can trade it, nobody has to know."
						image={
							<Image
								src="/landingassets/landingpage/3d_icons/basket.png"
								height={150}
								width={150}
								layout="fixed"
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
}