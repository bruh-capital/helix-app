import { Rerousel } from "rerousel";
import banners from "@includes/components/banners";

export default function BannerCarousel(props){
    return(
        <Rerousel interval={7000}>
            {Object.values(banners)}
        </Rerousel>
    )
}