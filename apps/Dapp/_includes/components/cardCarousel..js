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
			showArrows={false}
			showThumbs={false}
			interval={7000}
			className="-mb-12"
		>
			<AvailableCard />
			<AvailableCard />
			<AvailableCard />
		</Carousel>
	);
}