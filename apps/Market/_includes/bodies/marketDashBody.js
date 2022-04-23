import HomeCards from "@includes/components/homeCards";
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
  const topSellerVal = useRecoilValue(topSellersAtom);
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
        < HomeCards
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

          </div>
        </div>

        <div>
          {/* title div */}
          <div>
            Top Buyers
          </div>
          {/* content */}
          <div className="grid grid-cols-2 grid-rows-3">

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
      value: "helloworld1",
    },
    {
      value: "helloworld2",
    },
    {
      value: "helloworld3",
    },
    {
      value: "helloworld4",
    },
    {
      value: "helloworld5",
    },
  ]

  const topSellers = [
    {
      value: "helloworld1",
    },
    {
      value: "helloworld2",
    },
    {
      value: "helloworld3",
    },
    {
      value: "helloworld4",
    },
    {
      value: "helloworld5",
    },
  ];

  return { props: { recentlyListedItems, topBuyers, topSellers } };
}