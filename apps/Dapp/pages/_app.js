import 'styles/globals.css';
import { useState } from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

// Contexts
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';
import ProtocolContext from '@context/protocolDataContext';


function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  const [ data, setData ] = useState({
    hlxPrice: 0,
  }); 

  const icon = (
    <Image
      className="rounded-full"
      src="/3d/4K_3D_circleicon.png"
      width={48}
      height={48}
    />
  );

  return(
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'Helix',
        icon:  icon,
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
