import MarketDashBody from "@includes/bodies/marketDashBody";
import MarketDashHeader from "@includes/headers/marketDashHeader";
import GlobalHeader from "@includes/headers/globalHeader";
import DashFooter from "@includes/feet/dashFooter";

export default function MarketLayout() {
  return (
	<div>
    <GlobalHeader>
      <MarketDashHeader>
        
      </MarketDashHeader>
    </GlobalHeader>
    <MarketDashBody/>
    <DashFooter/>
      
  </div>
  )
}