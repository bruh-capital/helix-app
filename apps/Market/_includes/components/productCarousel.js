import { ProductCard } from "./productCard";
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
				props.products ? props.products?.map((item)=>{
					return <ProductCard
						imageLink = {item.imageUrl}
						username = {item.username}
						productName = {item.productName}
						price = {item.price}
						productType = {item.productType}
						likes = {item.likes}
						profileLink = {item.profileLink}
						passedRef = {ref}
					/>
				}):<></>
			}
        </Rerousel>
	);
}