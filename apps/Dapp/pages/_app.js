import 'styles/globals.css';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';

function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");

  return(
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'Helix'
      }}
    >
      <ThemeProvider attribute='class'>
        <LayoutContext.Provider value={{ layout, setLayout }}>
          <Component {...pageProps} />
        </LayoutContext.Provider>
      </ThemeProvider>
    </WalletKitProvider>
  );
}

export default MyApp;
