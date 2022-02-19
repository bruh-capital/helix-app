import { 
	AvailableCard,
	MarketCard,
} from '@includes/components/cards/cards';
import { useRef } from 'react';
import { Rerousel } from 'rerousel';

export default function CardCarousel(props) {
	const ref = useRef(null);

	return(
		<Rerousel itemRef={ref} interval={7000}>
			<AvailableCard passedRef={ref}/>
			<MarketCard />
		</Rerousel>
	);
}