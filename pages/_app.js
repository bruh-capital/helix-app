import 'tailwindcss/tailwind.css';
import * as splToken from '@project-serum/anchor';
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

import {Program, Provider, web3} from '@project-serum/anchor';
import {useAnchorWallet,ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from 'react';
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Keypair} from '@solana/web3.js';
import idl from "./idl/twst.json";

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

// ive decided not to add signing to any transaction because
// wallets automatically sign. therefore if a wallet does not have
// proper authority, they can not be invoking a certain function
function MyApp({ Component, pageProps }) {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

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

  const wallet = useAnchorWallet();
  
  return(
    <ConnectionProvider endpoint={endpoint} >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
