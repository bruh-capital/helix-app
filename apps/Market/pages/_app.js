import 'styles/globals.css';
import React, { useEffect, useState } from "react";
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import Image from 'next/image';

import {
  setUpNotifications,
  atalhoTheme,
  NotificationsProvider,
  notify
} from "reapop";

// Contexts
import { ThemeProvider } from "next-themes";

// reaop notifications
setUpNotifications({
  defaultProps: {
      position: 'top-right',
      dismissible: true,
      dismissAfter: 5000,
      showDismissButton: true,
  } 
});

function MarketApp({ Component, pageProps }) {
  // Image component we use in the goki wallet prompt
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
    <NotificationsProvider>
      <WalletKitProvider
        defaultNetwork='devnet'
        app={{
          name: 'Helix',
          icon:  icon,
        }}
      >
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      </WalletKitProvider>
    </NotificationsProvider>
  );
}

export default MarketApp;