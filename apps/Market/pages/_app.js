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

import ConnectionCtx from "@contexts/connectionCtx";
import ProviderCtx from "@contexts/providerContext";
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
              

                          <Component {...pageProps} />

              </ProviderCtx.Provider>
            </ConnectionCtx.Provider>

          </RecoilRoot>
        </ThemeProvider>
      </WalletKitProvider>
    </NotificationsProvider>
  );
}

export default MarketApp;