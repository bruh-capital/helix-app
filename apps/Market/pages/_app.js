import 'styles/globals.css';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import {
  setUpNotifications,
  atalhoTheme,
  NotificationsProvider,
  notify
} from "reapop";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import AccountsClientCtx from '@contexts/accountsClientCtx';
import BundlrClientCtx from "@contexts/bundlrClientCtx";
import DigitalMarketClientCtx from "@contexts/digitalMarketClientCtx";
import PhysicalMarketClientCtx from "@contexts/PhysicalMarketClientCtx";

// Contexts
import { ThemeProvider } from "next-themes";
import { useState } from 'react';

// reaop notifications
setUpNotifications({
  defaultProps: {
      position: 'top-right',
      dismissible: true,
      dismissAfter: 5000,
      showDismissButton: true,
  } 
});

function MarketApp({ Component, pageProps }) {
  const [accountsClient, setAccountsClient] = useState();
  const [digitalMarketClient, setDigitalMarketClient] = useState();
  const [physicalMarketClient, setPhysicalMarketClient] = useState();
  const [bundlrClient, setBundlrClient] = useState();


  // Image component we use in the goki wallet prompt
  const icon = (
    <Image
      className="rounded-full"
      src="/3d/4k_3D_circleicon.png"
      width={48}
      height={48}
      loading='eager'
    />
  );

  return(
    <NotificationsProvider>
      <WalletKitProvider>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <RecoilRoot>


            <AccountsClientCtx.Provider value={{accountsClient, setAccountsClient}}>
              <BundlrClientCtx.Provider value={{bundlrClient, setBundlrClient}}>
                <DigitalMarketClientCtx.Provider value={{digitalMarketClient, setDigitalMarketClient}}>
                  <PhysicalMarketClientCtx.Provider value={{physicalMarketClient, setPhysicalMarketClient}}>

                    <Component {...pageProps} />

                  </PhysicalMarketClientCtx.Provider>
                </DigitalMarketClientCtx.Provider>
              </BundlrClientCtx.Provider>
            </AccountsClientCtx.Provider>
            
          </RecoilRoot>
        </ThemeProvider>
      </WalletKitProvider>
    </NotificationsProvider>
  );
}

export default MarketApp;