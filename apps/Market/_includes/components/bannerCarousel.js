import { Rerousel } from "rerousel";
import { MarketIntroductionBanner } from "@includes/components/banners";
import { useRef } from "react";

export default function BannerCarousel(props){
    const [ref, setRef] = useRef(undefined);

    return(
        <Rerousel itemRef={ref} interval={7000}>
            <MarketIntroductionBanner passedRef={ref} />
        </Rerousel>
    )
}