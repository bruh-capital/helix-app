import MarketDashBody from "@includes/bodies/marketDashBody";
import MarketDashHeader from "@includes/headers/marketDashHeader";
import GlobalHeader from "@includes/headers/globalHeader";

export default function MarketLayout() {
  return (
	<div>
    <GlobalHeader>
      <MarketDashHeader>
        
      </MarketDashHeader>
    </GlobalHeader>
    <MarketDashBody>
      
    </MarketDashBody>
  </div>
  )
}