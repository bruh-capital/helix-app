import BestAccountsDisplay from "@includes/components/bestAccountsDisplay";
import BannerCarousel from "@includes/components/bannerCarousel";
import { ProductCardSmall } from "@includes/components/productCardSmall";
import {atom, useRecoilValue} from "recoil";

// import getTopSellers, getTopBuyers, getRecentlyListed

// image = {item.image}
// username = {item.username}
// productName = {item.productName}
// price = {item.price}
// productType = {item.productType}
// likes = {item.likes}
export default function MarketDashBody(props) {
  const recentlyListedAtom = atom({
    key: "recentlyListedItems",
    default: [
      {
        accountAddress: "0x1",
        productName: "Item 1",
        arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png",

        imageLink: "/products/image 57.png",
        username: "seller1",
        price: "100",
        productType: "nft",
        likes: "10",
        profileLink:"/profile_icons/image 25.png",
      },
      {
      accountAddress: "0x2",
      productName: "Item 2",
      arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png",

      imageLink: "/products/image 69.png",
      username: "seller2",
      price: "200",
      productType: "digital",
      likes: "5",
      profileLink:"/profile_icons/image 27.png",
      },
      {
      accountAddress: "0x3",
      productName: "Item 3",
      arweaveImageURl: "https://helixdao.org/landingassets/3dlogos/4K_3D_white.png",

      imageLink: "/products/image 91.png",
      username: "seller3",
      price: "300.50",
      productType: "physical",
      likes: "0",
      profileLink:"/profile_icons/image 28.png",
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
  console.log("recently listed", recentListingsVal);
  const topSellersVal = useRecoilValue(topSellersAtom);
  const topBuyersVal = useRecoilValue(topBuyersAtom);

	return(
    <div className="static grid grid-cols-1 place-items-center justify-center items-center w-full">
      
      <div className="p-8">
        <BannerCarousel/>
      </div>

      <div className="w-10/12 pt-12">
        <div className="font-bold py-8 text-4xl">
          Recently Added
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 grid-rows-2 gap-x-3 w-full">
          {
           recentListingsVal.map((item)=>{
            return <ProductCardSmall
              imageLink = {item.imageLink}
              username = {item.username}
              productName = {item.productName}
              price = {item.price}
              productType = {item.productType}
              likes = {item.likes}
              profileLink = {item.profileLink}
            />
           }) 
          }
        </div>


      </div>


      <div className="grid grid-cols-2 w-11/12 gap-x-12">

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
