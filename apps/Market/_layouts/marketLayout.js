import MarketDashBody from "@includes/bodies/marketDashBody";
import MarketDashHeader from "@includes/headers/marketDashHeader";
import GlobalHeader from "@includes/headers/globalHeader";
import DashFooter from "@includes/feet/dashFooter";

export default function MarketLayout(props) {
  return (
	<div>
    <GlobalHeader>
      <MarketDashHeader/>
    </GlobalHeader>
    <MarketDashBody/>
    <DashFooter/>
      
  </div>
  )
}