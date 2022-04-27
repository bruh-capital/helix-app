import { Rerousel } from "rerousel";
import { MarketIntroductionBanner } from "@includes/components/banners";
import { useState } from "react";
import { useRef } from "react";

export default function BannerCarousel(props){
    const [ref, setRef] = useRef(undefined);

    return(
        // <div></div>
        <Rerousel itemRef={ref} interval={7000}>
            <MarketIntroductionBanner passedRef={ref}/>
        </Rerousel>
    )
}