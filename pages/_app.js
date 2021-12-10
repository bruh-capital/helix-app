import 'tailwindcss/tailwind.css';
import * as splToken from '@project-serum/anchor';
import "@solana/spl-token";

let WALLETS = {
  getPhantomWallet: () => ({ name: 'Phantom' }),
  getSolflareWallet: () => ({ name: 'Solflare' }),
  getSolletWallet: () => ({ name: 'Sollet' }),
  getLedgerWallet: () => ({ name: 'Ledger' }),
  getSlopeWallet: () => ({ name: 'Slope' }),
  getSolletExtensionWallet: () => ({ name: 'SolletExtension' })
};

if (typeof window !== "undefined") {
  WALLETS = require("@solana/wallet-adapter-wallets");
}

import {Program, Provider, web3} from '@project-serum/anchor';
import {useAnchorWallet,ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from 'react';
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Keypair} from '@solana/web3.js';
import idl from "./idl/twst.json";

// const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
const network = "http://127.0.0.1:8899";

// ive decided not to add signing to any transaction because
// wallets automatically sign. therefore if a wallet does not have
// proper authority, they can not be invoking a certain function
function MyApp({ Component, pageProps }) {
  // const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      WALLETS.getPhantomWallet(),
      WALLETS.getSolflareWallet(),
      WALLETS.getSolletWallet({ network }),
      WALLETS.getLedgerWallet(),
      WALLETS.getSlopeWallet(),
      WALLETS.getSolletExtensionWallet({ network }),
    ], []
  );

  const wallet = useAnchorWallet();

  const programMultisigWallet = new PublicKey("2to8Y37AJAsCT7XFpSrvidTpSoF13L8pLM1pWoTgSprd");
  const programID = new PublicKey(idl.metadata.address);

  const connection = new Connection(network, "processed");
  const provider = new Provider(connection, wallet, "processed");
  const program = new Program(idl, programID, provider);

  async function initializeMint(){
    const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("initmint"), programID.toBuffer()],
      programID
    );
    await program.rpc.initMint(mintBump, {
      accounts:{
        mint: mintAccount,
        payer: wallet.publicKey,
        systemProgram: programID,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    });
  }

  async function createProtocolATA(){
    const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("initmint"), programID.toBuffer()],
      programID
    );

    const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
      programID
    );

    await program.rpc.initUserAta({
      userBump: protocolATABump,
      mintBump: mintBump,
    },{
    accounts:{
      userAta: protocolATA,
      payer: wallet.publicKey,
      user: wallet.publicKey,
      rent: web3.SYSVAR_RENT_PUBKEY,
      mint: mintAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      systemProgram: programID,
    },
    })
  }

  async function initializeProtocolData(){
    const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
      [Buffer.from("protocoldataaccount")],
      programID
    );
    await program.rpc.initProtocolData(
      protocolDataBump,
      {
        accounts:{
          protocolDataAccount: protocolDataAccount,
          owner: wallet.publicKey,
          systemProgram: programID,
          rent: web3.SYSVAR_RENT_PUBKEY
        },
      }
    )
  }

  async function initializeUserVault(){
    const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("uservault"), wallet.publicKey.toBuffer()],
      programID
    );
    await program.rpc.initUserVault(userVaultBump,
      {
      accounts:{
        userAccount: userVault,
        payer: wallet.publicKey,
        user: wallet.publicKey,
        systemProgram: programID,
      },
    });
  }

  async function createUserATA(){
    const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("initmint"), programID.toBuffer()],
      programID
    );
    const [userATA, userATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
      programID
    );

    await program.rpc.initUserAta({
      userBump: userATABump,
      mintBump: mintBump,
    },{
    accounts:{
      userAta: userATAAccount,
      payer: wallet.publicKey,
      user: wallet.publicKey,
      rent: web3.SYSVAR_RENT_PUBKEY,
      mint: mintAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      systemProgram: programID,
    },
  })
  }

  async function depositAssetPrintBond(asset_amount){
    const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
      programID
    );
    const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("uservault"), wallet.publicKey.toBuffer()],
      programID
    );
    const [userATA, userATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
      programID
    );
    // todo: calculate bond amount from pyth oracle.
    const bond_amount = 100;
    await program.rpc.depositAsset(userBump, new anchor.BN(asset_amount), new anchor.BN(bond_amount), {
      accounts:{
        userAta: userATA,
        protocAta: protocolATA,
        userVault: userVault,
        user: wallet.publicKey,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  }

  async function redeemBonds(){
    const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("initmint"), programID.toBuffer()],
      programID
    );
    const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("uservault"), wallet.publicKey.toBuffer()],
      programID
    );
    const [userATA, userATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
      programID
    );

    await program.rpc.redeemBonds({
      userVaultBump: userVaultBump,
      userAtaBump: userATABump,
      mintBump: mintBump,
    },{
      accounts:{
        user: wallet.publicKey,
        userData: userVault,
        mint: mintAccount,
        mintAuth: wallet.publicKey,
        userAta: userATA,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        systemProgram: programID,
      },
    })
  }

  // stake amount is in twst
  async function stake(amount){
    const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
      [Buffer.from("protocoldataaccount")],
      programID
    );
    const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
      programID
    );
    const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("uservault"), wallet.publicKey.toBuffer()],
      programID
    );
    const [userATA, userATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
      programID
    );

    await program.rpc.stake({
      userVault: userVaultBump,
      userAta: userATABump,
      protocolData: protocolDataBump,
    },new anchor.BN(amount), {
      accounts:{
        userAta: userATA,
        protocAta: protocolATA,
        userVault: userVault,
        protocolData: protocolDataAccount,
        user: wallet.publicKey,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  }

  // unstake amount is stwst
  async function unstake(amount){
    const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
      [Buffer.from("protocoldataaccount")],
      programID
    );
    const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
      programID
    );
    const [userVault, userVaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("uservault"), wallet.publicKey.toBuffer()],
      programID
    );
    const [userATA, userATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), wallet.publicKey.toBuffer()],
      programID
    );

    await program.rpc.unstake({
      userVault: userVaultBump,
      userAta: userATABump,
      protocolData: protocolDataBump,
    }, new anchor.BN(amount),{
      accounts:{
        user: wallet.publicKey,
        userAta: userATA,
        userVault: userVault,
        protocolData: protocolDataAccount,
        protocAta: protocolATA,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        tokenAuthority: wallet.publicKey,
      },
    })
  }

  async function rebase(){
    const [mintAccount, mintBump] = await PublicKey.findProgramAddress(
      [Buffer.from("initmint"), programID.toBuffer()],
      programID
    );

    const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
      [Buffer.from("protocoldataaccount")],
      programID
    );

    const [protocolATA, protocolATABump] = await PublicKey.findProgramAddress(
      [Buffer.from("usertokenaccount"), programMultisigWallet.toBuffer()],
      programID
    );
    await program.rpc.rebase({
      mintBump: mintBump,
      protocolDataBump: protocolDataBump,
    }, {
      accounts:{
        protocolData: protocolDataAccount,
        protocAta: protocolATA,
        mint: mintAccount,
        owner: wallet.publicKey,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        systemProgram: programID,
      }
    })
  }

  async function changeRebaseRate(new_rate){
    const [protocolDataAccount, protocolDataBump] = await PublicKey.findProgramAddress(
      [Buffer.from("protocoldataaccount")],
      programID
    );
    await program.rpc.changeRebaseRate(protocolDataBump, 
      new anchor.BN(new_rate),
      {
      accounts:{
        protocolData: protocolDataAccount,
        owner: wallet.publicKey,
      },
    })
  }
  
  return(
    <ConnectionProvider endpoint="http://127.0.0.1:8899" >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
