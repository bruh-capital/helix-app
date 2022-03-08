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
import DetailDataContext from '@context/detailDataContext';

function MyApp({ Component, pageProps }) {
  const [ layout, setLayout ] = useState("dashboard");
  const [userVault, setUserVault] = useState();
  const [client, setClient] = useState(new helixClient());

  // Data that is pretty much used on UI
  const [ detailData, setDetailData ] = useState({
    hlxPrice: 0,
    stakeData: null, // []
    revenueData: [],
    tvlData: null,
    priceData: [],
  }); 

  // On chain (from program) data
  const [ protocolData, setProtocolData ] = useState();

  // useEffect to get user account data from on chain
	useEffect(async () => {
		if(client && client?.getUserVault){
			let uv = await client.getUserVault();
			if(uv != undefined){
				setUserVault(userVault);
			}
		}

		if(client && client?.getProtocolData){
			let newData = await client.getProtocolData();
			setProtocolData(newData);
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
      <DetailDataContext.Provider value={{ detailData, setDetailData }}>
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
      </DetailDataContext.Provider>
    </WalletKitProvider>
  );
}

export default MyApp;
