import ProductCarousel from "@includes/components/productCarousel";
import BestAccountsDisplay from "@includes/components/bestAccountsDisplay";
import BannerCarousel from "@includes/components/bannerCarousel";
import {atom, useRecoilValue} from "recoil";

export default function MarketDashBody({ recentlyListedItems, topSellers, topBuyers }) {
  console.log(recentlyListedItems);
  const recentlyListedAtom = atom({
    key: "recentlyListedItems",
    default: recentlyListedItems,
  });

  const topSellersAtom = atom({
    key: "topSellers",
    default: topSellers,
  });

  const topBuyersAtom = atom({
    key: "topBuyers",
    default: topBuyers,
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

export async function getStaticProps() {
  // FETCHING MOST RECENTLY LISTED ITEMS
  // do some magic fetching with the solana client later
  // for now we just create a dummy state...

  const recentlyListedItems = [
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
  ];

  const topBuyers = [
    {
      username: "buyer1",
      moneyAmount: "100",
    },
    {
      username: "buyer2",
      moneyAmount: "100",
    },
    {
      username: "buyer3",
      moneyAmount: "100",
    },
    {
      username: "buyer4",
      moneyAmount: "100",
    },
    {
      username: "buyer5",
      moneyAmount: "100",
    },
  ]

  const topSellers = [
    {
      username: "seller1",
      moneyAmount: "100",
    },
    {
      username: "seller2",
      moneyAmount: "100",
    },
    {
      username: "seller3",
      moneyAmount: "100",
    },
    {
      username: "seller4",
      moneyAmount: "100",
    },
    {
      username: "seller5",
      moneyAmount: "100",
    },
  ];

  return { props: { recentlyListedItems, topBuyers, topSellers } };
}