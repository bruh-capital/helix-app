import 'styles/globals.css';
import React, { useEffect, useState } from "react";
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import helixClient from 'helix-client';

// Contexts
import { ThemeProvider } from "next-themes";
import LayoutContext from '@context/layoutContext';
import ProtocolContext from '@context/protocolDataContext';
import HelixContext from '@context/helixContext';
import UserDataContext from '@context/userDataContext';

function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  const [ protocolData, setProtocolData ] = useState({
    hlxPrice: 0,
  }); 
  const [userVault, setUserVault] = useState();
  const [client, setClient] = useState(new helixClient());

	useEffect(async () => {
		if(client && client?.getUserVault){
			let userVault = await client.getUserVault();
			if(userVault){
				setUserVault(userVault);
				setStakedBalance(userVault.stakeBalance.toNumber())	
			}
		}

		if(client && client?.getProtocolData){
			let protocData = await client.getProtocolData();
			setProtocolData(protocData);
		}
	}, [client]);

  const icon = (
    <Image
      className="rounded-full"
      src="/3d/4k_3D_circleicon.png"
      width={48}
      height={48}
      loading='eager'
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
      <ProtocolContext.Provider value={{ protocolData, setProtocolData }}>
        <ThemeProvider attribute='class'>
          <HelixContext.Provider value={{ client, setClient }}>
            <UserDataContext.Provider value ={{ userVault, setUserVault }}>
              <LayoutContext.Provider value={{ layout, setLayout }}>
                <Component {...pageProps} />
              </LayoutContext.Provider>
            </UserDataContext.Provider>
          </HelixContext.Provider>
        </ThemeProvider>
      </ProtocolContext.Provider>
    </WalletKitProvider>
  );
}

export default MyApp;
