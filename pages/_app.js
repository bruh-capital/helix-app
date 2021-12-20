import 'tailwindcss/tailwind.css';
import "@solana/spl-token";
import { Html } from 'next/document';

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

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from 'react';
import AppMetaTagComponent from '@includes/metaTags';

//const network = process.env.NEXT_APP_RPC_URL;
const network = "http://localhost:8899"

// ive decided not to add signing to any transaction because
// wallets automatically sign. therefore if a wallet does not have
// proper authority, they can not be invoking a certain function
function MyApp({ Component, pageProps }) {
  const endpoint = useMemo(() => network, []);

  const wallets = useMemo(
    () => [
      WALLETS.getPhantomWallet(),
      WALLETS.getSolflareWallet(),
      WALLETS.getSolletWallet({ network }),
      WALLETS.getLedgerWallet(),
      WALLETS.getSlopeWallet(),
      WALLETS.getSolletExtensionWallet({ network }),
    ], []
  );

  return(
    <AppMetaTagComponent>
      <ConnectionProvider endpoint={endpoint} >
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
              <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AppMetaTagComponent>
  );
}

export default MyApp;
