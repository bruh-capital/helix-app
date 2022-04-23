import ProductCarousel from "@includes/components/productCarousel";
import ProfileCard from "@includes/components/profileCard";
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
      {/* banner */}
      <div>

      </div>

      <div>
        <div>
          Recently Added
        </div>
        {/* make this carousel. onhover, stop scrolling */}
        < ProductCarousel
          products = {recentListingsVal}
        />
        <div className="w-full opacity-50 place-items-center">
          Load More
        </div>
      </div>


      <div className="grid grid-cols-2">

        <div>
          {/* title div */}
          <div>
            Top Sellers
          </div>
          {/* content */}
          <div className="grid grid-cols-2 grid-rows-3">
            {topSellersVal.map((seller, i)=>{
              <ProfileCard
                cardIndex = {i}
                username = {seller.username}
                moneyAmount = {seller.moneyAmount}
              />
            })}
          </div>
        </div>

        <div>
          {/* title div */}
          <div>
            Top Buyers
          </div>
          {/* content */}
          <div className="grid grid-cols-2 grid-rows-3">
            {topBuyersVal.map((buyer, i)=>{
              <ProfileCard
                cardIndex = {i}
                username = {buyer.username}
                moneyAmount = {buyer.moneyAmount}
              />
            })}
          </div>
        </div>

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