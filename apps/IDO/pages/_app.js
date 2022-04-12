import 'styles/globals.css';
import { useState } from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import helixClient from 'helix-client';

// Contexts
import { ThemeProvider } from "next-themes";



function MyApp({ Component, pageProps }) {
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
      <ThemeProvider attribute='class'>
          <HelixContext.Provider value={{client, setClient}}>
          <Component {...pageProps} />
          </HelixContext.Provider>
        </ThemeProvider>
    </WalletKitProvider>
  );
}

export default MyApp;
