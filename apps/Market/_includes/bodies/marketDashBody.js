import ProductCarousel from "@includes/components/productCarousel";
import BestAccountsDisplay from "@includes/components/bestAccountsDisplay";
import BannerCarousel from "@includes/components/bannerCarousel";
import {atom, useRecoilValue} from "recoil";

// import getTopSellers, getTopBuyers, getRecentlyListed

export default function MarketDashBody(props) {
  const recentlyListedAtom = atom({
    key: "recentlyListedItems",
    default: [
      {
      accountAddress: "0x1",
      title: "Item 1",
      arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png"
      },
      {
      accountAddress: "0x2",
      title: "Item 2",
      arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png"
      },
      {
      accountAddress: "0x3",
      title: "Item 3",
      arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png"
      },
    ],
  });

  const topSellersAtom = atom({
    key: "topSellers",
    default: [
      {
      username: "buyer1",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 25.png"
      },
      {
      username: "buyer2",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 27.png"
      },
      {
      username: "buyer3",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 28.png"
      },
      {
      username: "buyer4",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 29.png"
      },
      {
      username: "buyer5",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 30.png"
      },
    ],
  });

  const topBuyersAtom = atom({
    key: "topBuyers",
    default: [
      {
      username: "seller1",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 31.png"
      },
      {
      username: "seller2",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 33.png"
      },
      {
      username: "seller3",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 47.png"
      },
      {
      username: "seller4",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 48.png"
      },
      {
      username: "seller5",
      moneyAmount: "100",
      imageLink: "/profile_icons/image 50.png"
      },
    ],
  });

  const recentListingsVal = useRecoilValue(recentlyListedAtom);
  const topSellersVal = useRecoilValue(topSellersAtom);
  const topBuyersVal = useRecoilValue(topBuyersAtom);

	return(
    <div>
      
      <BannerCarousel/>

      <div>
        <div>
          Recently Added
        </div>
        
        < ProductCarousel
          products = {recentListingsVal}
        />

        {/* <div className="w-full opacity-50 place-items-center">
          Load More
        </div> */}
      </div>


      <div className="grid grid-cols-2">

        <BestAccountsDisplay
          title="Top Sellers"
          accounts={topSellersVal}
        />
        
        <BestAccountsDisplay
          title="Top Buyers"
          accounts={topBuyersVal}
        />
        

      </div>
    </div>
	);
}
