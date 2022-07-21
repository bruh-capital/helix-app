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

import AccountsClientCtx from "@contexts/accountsClientCtx";
import PhysicalMarketClientCtx from "@contexts/physicalMarketClientCtx";
import DigitalMarketClientCtx from "@contexts/DigitalMarketClientCtx";
import BundlrClientCtx from "@contexts/BundlrClientCtx";
import ConnectionCtx from "@contexts/connectionCtx";
import ProviderCtx from "@contexts/providerContext";
import JupiterClientCtx from '@contexts/jupiterClientCtx';
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
  const [jupiterClient, setJupiterClient] = useState();

  const [connection, setConnection] = useState();
  const [provider, setProvider] = useState();


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
      <WalletKitProvider
        defaultNetwork='devnet'
        app={{
          name: 'Helix',
          icon:  icon,
        }}
      >
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <RecoilRoot>

            <ConnectionCtx.Provider value={{connection, setConnection}}>
              <ProviderCtx.Provider value={{provider, setProvider}}>
                
                <JupiterClientCtx.Provider value = {{jupiterClient, setJupiterClient}}>
                  <AccountsClientCtx.Provider value={{accountsClient, setAccountsClient}}>
                    <BundlrClientCtx.Provider value={{bundlrClient, setBundlrClient}}>
                      <DigitalMarketClientCtx.Provider value={{digitalMarketClient, setDigitalMarketClient}}>
                        <PhysicalMarketClientCtx.Provider value={{physicalMarketClient, setPhysicalMarketClient}}>

                          <Component {...pageProps} />

                        </PhysicalMarketClientCtx.Provider>
                      </DigitalMarketClientCtx.Provider>
                    </BundlrClientCtx.Provider>
                  </AccountsClientCtx.Provider>
                </JupiterClientCtx.Provider>

              </ProviderCtx.Provider>
            </ConnectionCtx.Provider>

          </RecoilRoot>
        </ThemeProvider>
      </WalletKitProvider>
    </NotificationsProvider>
  );
}

export default MarketApp;