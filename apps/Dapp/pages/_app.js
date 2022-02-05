import 'styles/globals.css';
import "@solana/spl-token";

let WALLETS = {
  getPhantomWallet: () => ({ name: 'Phantom' }),
  getSolflareWallet: () => ({ name: 'Solflare' }),
  getSolletWallet: () => ({ name: 'Sollet' }),
  getLedgerWallet: () => ({ name: 'Ledger' }),
  getSlopeWallet: () => ({ name: 'Slope' }),
  getSolletExtensionWallet: () => ({ name: 'SolletExtension' })
};

if (typeof window !== "undefined") {
  WALLETS = require("@solana/wallet-adapter-wallets");
}

const CLUSTERS = {
  localnet:   "http://localhost:8899",
  devnet:     "https://api.devnet.solana.com",
  testnet:    "https://api.testnet.solana.com",
  mainnet:    "https://api.mainnet-beta.solana.com",
}

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useState, useMemo } from 'react';
import AppMetaTagComponent from '@includes/metaTags';
import { NotificationsProvider, setUpNotifications } from 'reapop';

// Custom Context Providers
import MultiSigContext from '@context/multiSigContext';
import RpcUrlContext from '@context/rpcUrlContext';
import ThemeContext from '@context/themeContext';
import PageContext from '@context/pageContext';
import HelixContext from '@context/helixClientContext';



function MyApp({ Component, pageProps }) {
  const [ multiSigAddr, setMultiSigAddr ] = useState();
  const [ theme, setTheme ] = useState("light");
  const [ page, setPage ] = useState("dash");
  const [client, setClient] = useState();

  const [ rpcUrl, setRpcUrl ] = useState(CLUSTERS.devnet);
  const endpoint = useMemo(() => rpcUrl, []);

  const wallets = useMemo(
    () => [
      WALLETS.getPhantomWallet(),
      WALLETS.getSolflareWallet(),
      WALLETS.getSolletWallet({ endpoint }),
      WALLETS.getLedgerWallet(),
      WALLETS.getSlopeWallet(),
      WALLETS.getSolletExtensionWallet({ endpoint }),
    ], []
  );

  setUpNotifications({
    defaultProps: {
      position: 'top-right',
      dismissible: true,
      dismissAfter: 5000,
      showDismissButton: true,
    }
  });

  return(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PageContext.Provider value={{ page, setPage }}>
        <HelixContext.Provider value = {{client, setClient}}>
          <AppMetaTagComponent classname="bg-black">
            <MultiSigContext.Provider value={{ multiSigAddr, setMultiSigAddr }}>
              <RpcUrlContext.Provider value={{ rpcUrl, setRpcUrl }}>
                <ConnectionProvider endpoint={rpcUrl} >
                  <WalletProvider wallets={wallets}>
                    <WalletModalProvider logo="./2d/logo.png">
                      <NotificationsProvider>
                        <Component {...pageProps} />
                      </NotificationsProvider>
                    </WalletModalProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </RpcUrlContext.Provider>
            </MultiSigContext.Provider>
          </AppMetaTagComponent>
        </HelixContext.Provider>
      </PageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
