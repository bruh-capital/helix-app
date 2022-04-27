import ProductCard from './profileCard';
import { MarketIntroductionBanner } from "@includes/components/banners";
import { useRef, useState } from 'react';
import { Rerousel } from 'rerousel';

export default function ProductCarousel(props) {
	console.log(props);
	const [ref, setRef] = useRef(undefined);
	const [carouselStopped, setCarouselStopped] = useState(false);
	return(
		<Rerousel itemRef={ref} interval={7000}>
			{
				props.products ? 
					props.products?.map((item)=>{
						<ProductCard
							image = {item.image}
							username = {item.username}
							productName = {item.productName}
							price = {item.price}
							productType = {item.productType}
							likes = {item.likes}
							passedRef = {ref}
						/>
					}): <></>
			}
        </Rerousel>
		// <Rerousel
		// 	itemRef={ref}
		// 	interval={7000}
		// 	// stop={carouselStopped}
		// 	// onMouseEnter = {()=>{setCarouselStopped(!carouselStopped)}}
		// 	// onMouseLeave = {()=>{setCarouselStopped(!carouselStopped)}}
		// >
			
		// </Rerousel>
	);
}