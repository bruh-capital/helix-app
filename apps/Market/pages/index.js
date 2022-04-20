import HomeLayout from "@layouts/homeLayout";

export default function IndexPage({ recentlyListedItems, topSellers, topBuyers }) {
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

	return(
    <HomeLayout
      recentlyListed={recentlyListedAtom}
      topSellers={topSellersAtom}
      topBuyers={topBuyersAtom}
    />
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