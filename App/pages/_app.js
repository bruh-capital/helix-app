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
import MultiSigContext from '@context/multiSigContext';

// TODO(@millionz) - impl the fkn helix context thing
function MyApp({ Component, pageProps }) {
  const rpcUrl = CLUSTERS.devnet;
  const endpoint = useMemo(() => rpcUrl, []);

  const wallets = useMemo(
    () => [
      WALLETS.getPhantomWallet(),
      WALLETS.getSolflareWallet(),
      WALLETS.getSolletWallet({ cachedRpcUrl }),
      WALLETS.getLedgerWallet(),
      WALLETS.getSlopeWallet(),
      WALLETS.getSolletExtensionWallet({ cachedRpcUrl }),
    ], []
  );

  return(
    <AppMetaTagComponent classname="bg-black">
      <MultiSigContext.Provider value={{ Addr }}>
        <ConnectionProvider endpoint={endpoint} >
          <WalletProvider wallets={wallets}>
            <WalletModalProvider logo="https://helixdao.org/helix2dround.png">
              <Component {...pageProps} />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </MultiSigContext.Provider>
    </AppMetaTagComponent>
  );
}

export default MyApp;
