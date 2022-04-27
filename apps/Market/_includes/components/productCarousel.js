import ProductCard from './profileCard';
import { useRef, useState } from 'react';
import { Rerousel } from 'rerousel';

export default function ProductCarousel(props) {
	const ref = useRef(null);
	const [carouselStopped, setCarouselStopped] = useState(false);
	return(
		<Rerousel
			itemRef={ref}
			interval={7000}
			stop={carouselStopped}
			onMouseEnter = {()=>{setCarouselStopped(!carouselStopped)}}
			onMouseLeave = {()=>{setCarouselStopped(!carouselStopped)}}
		>
			{props.products?.map((item)=>{
				<ProductCard
					image = {item.image}
					username = {item.username}
					productName = {item.productName}
					price = {item.price}
					productType = {item.productType}
					likes = {item.likes}
				/>
			})}
		</Rerousel>
	);
}