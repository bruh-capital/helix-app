import 'styles/globals.css';

import { WalletKitProvider } from '@gokiprotocol/walletkit';

function MyApp({ Component, pageProps }) {

  return(
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'Helix'
      }}
    >
      <Component {...pageProps} />
    </WalletKitProvider>
  );
}

export default MyApp;
