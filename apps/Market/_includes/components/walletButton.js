// import { Connection } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

// import {MarketplaceAccountsClient} from 'marketplace-clients';
// import {PhysicalMarketplaceClient} from 'marketplace-clients';
// import {DigitalMarketplaceClient} from 'marketplace-clients';

// import AccountsClientCtx from "@contexts/accountsClientCtx";
// import PhysicalMarketClientCtx from "@contexts/physicalMarketClientCtx";
// import DigitalMarketClientCtx from "@contexts/DigitalMarketClientCtx";
// import ConnectionCtx from "@contexts/connectionCtx";
// import ProviderCtx from "@contexts/providerContext";

import { useContext } from "react";

export default function WalletButton(props){
    const wallet = useConnectedWallet();
	const goki = useWalletKit();

	const { disconnect } = useSolana();

	const handleDisconnect = () => {
		try {
			disconnect();
			notify("", "info", { title: "Disconnected!", position: "top-center" });
		} catch(e) {
			notify("", "error", { title: "Error disconnecting!", position: "top-center" });
		}
	}

    // const {accountsClient, setAccountsClient} = useContext(AccountsClientCtx);
    // const {physicalMarketClient, setPhysicalMarketClient} = useContext(PhysicalMarketClientCtx);
    // const {digitalMarketClient, setDigitalMarketClient} = useContext(DigitalMarketClientCtx);

    // const {connection, setConnection} = useContext(ConnectionCtx);
    // const {provider, setProvider} = useContext(ProviderCtx);

    // useEffect(()=>{
        
    //     if(!wallet){
    //         return
    //     };
        

    //     let conn = new Connection(process.env.NEXT_PUBLIC_RPC_URL ? process.env.NEXT_PUBLIC_RPC_URL : "https://api.devnet.solana.com");

    //     let provider = new anchor.AnchorProvider(
    //         conn,
    //         wallet,
    //         anchor.AnchorProvider.defaultOptions()
    //     );

    //     setAccountsClient(new MarketplaceAccountsClient(wallet, conn, provider));
    //     setPhysicalMarketClient(new PhysicalMarketplaceClient(wallet, conn, provider));
    //     setDigitalMarketClient(new DigitalMarketplaceClient(wallet, conn, provider));

    //     setConnection(conn);
    //     setProvider(provider);
    // }, [wallet])
    
    return (<div className="pr-2">
        {
            wallet ? 
            (
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className="px-2 md:px-3 py-1 md:py-2 rounded-md text-black bg-[#C8C7CA] dark:bg-[#3A3D45] dark:text-white text-ellipsis font-sm md:font-normal"
                            >
                            <span>{"🔑 " + wallet?.publicKey?.toString()?.slice(0, 8) + "..."}</span>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-400"
                                enterFrom="opacity-0 translate-y-2"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-2"
                            >
                                <Popover.Panel className="absolute z-50 w-screen max-w-sm mt-3 transform left-0 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-0 sm:px-0">
                                    <div className="overflow-hidden rounded-md shadow-md bg-[#D9D8E2] dark:bg-[#212429]">
                                        <div className="relative grid p-4 grid-cols-1 space-y-3">
                                            <button
                                                className="rounded-md font-semibold py-2 px-3 bg-[#C8C7CA] text-black dark:bg-[#3A3D45] dark:text-white"
                                                onClick={handleDisconnect}
                                            >
                                                Disconnect
                                                </button>
                                            <div className="text-black dark:text-white font-semibold text-center">{"Network: " + process.env.NEXT_PUBLIC_RPC_URL}</div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            ) : (
                <div className="rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-[1.5px]">
                    <button 
                        className="flex flex-row justify-center text-md font-medium px-2 md:px-3 py-1 md:py-2 bg-[#262626] rounded-3xl"
                        onClick={() => goki.connect()}
                    >
                        <span className="whitespace-nowrap px-2 text-sm">Connect</span>
                    </button>
                </div>
            )
        }
    </div>)
}