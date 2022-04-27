import { Rerousel } from "rerousel";
import banners from "@includes/components/banners";

export default function BannerCarousel(props){
    console.log("banners", banners);

    return(
        <Rerousel interval={7000}>
            {/* {banners && Object.values(banners)} */}
        </Rerousel>
    )
}