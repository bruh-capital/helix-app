import 'styles/globals.css';
import { useState } from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';

// Contexts
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';
import ProtocolContext from '@context/protocolDataContext';


function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  const [ data, setData ] = useState({
    hlxPrice: 0,
  }); 

  return(
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'Helix'
      }}
    >
      <ProtocolContext.Provider value={{ data, setData }}>
        <ThemeProvider attribute='class'>
          <LayoutContext.Provider value={{ layout, setLayout }}>
            <Component {...pageProps} />
          </LayoutContext.Provider>
        </ThemeProvider>
      </ProtocolContext.Provider>
    </WalletKitProvider>
  );
}

export default MyApp;
