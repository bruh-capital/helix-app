import { Head } from "next/document";
import MetaTagComponent from "@includes/metatags";

export default function Home() {
  return (
    <MetaTagComponent>
      <div className="hero min-h-screen" style={{backgroundImage: "url(/helixbanner.png)"}} />
    </MetaTagComponent>
  )
}
