import * as Cards from '@includes/components/cards';
import { useRef } from 'react';
import { Rerousel } from 'rerousel';

export default function CardCarousel() {
	const ref = useRef(null);
	return(
		<Rerousel itemRef={ref} interval={7000}>
			<Cards.WavesCard passedRef={ref}/>
		</Rerousel>
	);
}