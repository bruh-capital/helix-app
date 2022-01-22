import Link from "next/link";
import MetaTagComponent from "@includes/metatags";

export default function Home() {
  return (
    <MetaTagComponent>
      <div className="hero min-h-screen h-full" style={{backgroundImage: "url(/pageassets/narrow_banner.png)"}}>
        <Link href="https://app.helixdao.org">
          <button
            style={{background: "linear-gradient(to right, #58B9FF, #FF61DB)"}}
            className="translate-y-28 text-xl font-bold text-white py-3 px-6 rounded-md "
          >Launch App</button>
        </Link>
      </div>
    </MetaTagComponent>
  )
}
