import { AvailableCard } from '@includes/components/cards/cards';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CardCarousel() {
	return(
		<Carousel 
			autoPlay
			infiniteLoop
			stopOnHover
			showStatus={false}
			interval={7000}
			className="h-full w-full col-span-2 row-span-1"
		>
			<AvailableCard />
			<AvailableCard />
			<AvailableCard />
		</Carousel>
	);
}