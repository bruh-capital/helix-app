import ProductCard from './profileCard';
import { useRef } from 'react';
import { Rerousel } from 'rerousel';

export default function ProductCarousel(props) {
	const ref = useRef(null);
	return(
		<Rerousel itemRef={ref} interval={7000}>
			{props.products.map((item)=>{
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