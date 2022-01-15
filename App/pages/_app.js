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

setUpNotifications({
  defaultProps: {
    position: 'top-right',
    dismissible: true,
  }
});

function MyApp({ Component, pageProps }) {
  const [ multiSigAddr, setMultiSigAddr ] = useState();
  const [ theme, setTheme ] = useState("light");
  const [ page, setPage ] = useState("dash");

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

  return(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PageContext.Provider value={{ page, setPage }}>
        <AppMetaTagComponent classname="bg-black">
          <MultiSigContext.Provider value={{ multiSigAddr, setMultiSigAddr }}>
            <RpcUrlContext.Provider value={{ rpcUrl, setRpcUrl }}>
              <ConnectionProvider endpoint={rpcUrl} >
                <WalletProvider wallets={wallets}>
                  <WalletModalProvider logo="https://helixdao.org/helix2dround.png">
                    <NotificationsProvider>
                      <Component {...pageProps} />
                    </NotificationsProvider>
                  </WalletModalProvider>
                </WalletProvider>
              </ConnectionProvider>
            </RpcUrlContext.Provider>
          </MultiSigContext.Provider>
        </AppMetaTagComponent>
      </PageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
