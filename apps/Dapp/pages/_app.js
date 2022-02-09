import 'styles/globals.css';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return(
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'Helix'
      }}
    >
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </WalletKitProvider>
  );
}

export default MyApp;
