import 'styles/globals.css';
import { useState } from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import helixClient from 'helix-client';

// Contexts
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';
import ProtocolContext from '@context/protocolDataContext';
import HelixContext from '@context/helixContext';


function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  const [ data, setData ] = useState({
    hlxPrice: 0,
  }); 
  const [client, setClient] = useState(new helixClient());

  const icon = (
    <Image
      className="rounded-full"
      src="/3d/4k_3D_circleicon.png"
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
          <HelixContext.Provider value={{client, setClient}}>
            <LayoutContext.Provider value={{ layout, setLayout }}>
              <Component {...pageProps} />
            </LayoutContext.Provider>
          </HelixContext.Provider>
        </ThemeProvider>
      </ProtocolContext.Provider>
    </WalletKitProvider>
  );
}

export default MyApp;
