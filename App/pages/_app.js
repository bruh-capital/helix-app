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
import { useMemo } from 'react';
import AppMetaTagComponent from '@includes/metaTags';

// TODO(@millionz) - impl the fkn helix context thing
function MyApp({ Component, pageProps }) {
  const rpcUrl = CLUSTERS[network];
  const cachedRpcUrl = useMemo(() => rpcUrl, [network]);

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
      <mainContext.Provider value={{ network, endpoint, multiSigAddr }}>
        <ConnectionProvider endpoint={endpoint} >
          <WalletProvider wallets={wallets}>
            <WalletModalProvider logo="https://helixdao.org/helix2dround.png">
              <Component {...pageProps} />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </mainContext.Provider>
    </AppMetaTagComponent>
  );
}

export default MyApp;
