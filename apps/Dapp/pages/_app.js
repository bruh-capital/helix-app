import 'styles/globals.css';
import React, { useEffect, useState } from "react";
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import {
  setUpNotifications,
  atalhoTheme,
  NotificationsProvider,
  notify
} from "reapop";

// Contexts
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';
import DetailDataContext from '@context/detailDataContext';

// client contexts
import BasicClientCtx from '@context/clients/basicClientCtx';
import BondClientCtx from '@context/clients/bondClientCtx';
import HelixClientCtx from '@context/clients/twstClientCtx';

import ProviderCtx from '@context/solana/providerContext';
import ConnectionCtx from '@context/solana/connectionContext';

// reaop notifications
setUpNotifications({
  defaultProps: {
      position: 'top-right',
      dismissible: true,
      dismissAfter: 5000,
      showDismissButton: true,
  } 
});

function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  // Data that is pretty much used on UI
  const [ detailData, setDetailData ] = useState({
    hlxPrice: 0,
    stakeData: undefined, // []
    revenueData: undefined,
    tvlData: undefined,
    priceData: undefined,
  }); 


  const [ basicClient, setBasicClient ] = useState();
  const [ bondClient, setBondClient ] = useState();
  const [ helixClient, setHelixClient ] = useState();

  const [ connection, setConnection ] = useState();
  const [ provider, setProvider ] = useState();


  // Image component we use in the goki wallet prompt
  const icon = (
    <Image
      className="rounded-full"
      src="/3d/4k_3D_circleicon.png"
      width={48}
      height={48}
      loading='eager'
      priority={true}
    />
  );

  return(
    <NotificationsProvider>
      <WalletKitProvider
        defaultNetwork='devnet'
        app={{
          name: 'Helix',
          icon:  icon,
        }}
      >
        <DetailDataContext.Provider value={{ detailData, setDetailData }}>
          <ThemeProvider attribute='class'>
            <ProviderCtx.Provider value = {{provider, setProvider}}>
              <ConnectionCtx.Provider value = {{connection, setConnection}}>
                <BasicClientCtx.Provider value={{basicClient, setBasicClient}}>
                  <BondClientCtx.Provider value={{bondClient, setBondClient}}>
                    <HelixClientCtx.Provider value={{helixClient, setHelixClient}}>
                      <LayoutContext.Provider value={{ layout, setLayout }}> 
                        <Component {...pageProps} />
                      </LayoutContext.Provider>
                    </HelixClientCtx.Provider>
                  </BondClientCtx.Provider>
                </BasicClientCtx.Provider>
              </ConnectionCtx.Provider>
            </ProviderCtx.Provider>
          </ThemeProvider>
        </DetailDataContext.Provider>
      </WalletKitProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
