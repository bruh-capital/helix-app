import { AvailableCard } from '@includes/components/cards/cards';
import { Rerousel } from 'rerousel';

export default function CardCarousel(props) {
	return(
		<Rerousel>
			<AvailableCard />
		</Rerousel>
	);
}