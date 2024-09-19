import React, { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Web3 from "web3";

const theme = createTheme();

const WalletContextProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [ethereumAccount, setEthereumAccount] = useState(null);
  const {
    connected: solanaConnected,
    wallet: solanaWallet,
    connect: connectSolana,
    disconnect: disconnectSolana,
  } = useWallet();

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setEthereumAccount(accounts[0]);
        })
        .catch((error) => {
          console.error("Error requesting accounts:", error);
        });

      window.ethereum.on("accountsChanged", (accounts) => {
        setEthereumAccount(accounts[0]);
        console.log("Ethereum account changed:", accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        console.log("Ethereum network changed:", chainId);
      });
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
      <WalletProvider wallets={wallets} autoConnect>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
const WalletInfo = () => {
  const [ethereumAccount, setEthereumAccount] = useState(null);
  const {
    connected: solanaConnected,
    wallet: solanaWallet,
    connect: connectSolana,
    disconnect: disconnectSolana,
  } = useWallet();

  const switchEthereumAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setEthereumAccount(accounts[0]);
        console.log("Switched to Ethereum account:", accounts[0]);
      } catch (error) {
        console.error("Error switching Ethereum accounts:", error);
      }
    }
  };

  return (
    <div>
      <h2>Solana Wallet</h2>
      <p>
        {solanaConnected
          ? `Connected with ${solanaWallet.name}`
          : "Not connected"}
      </p>
      <button onClick={solanaConnected ? disconnectSolana : connectSolana}>
        {solanaConnected ? "Disconnect" : "Connect"} Solana Wallet
      </button>

      <h2>Ethereum Wallet</h2>
      <p>
        {ethereumAccount
          ? `Connected with Ethereum account: ${ethereumAccount}`
          : "Not connected"}
      </p>
      <button onClick={switchEthereumAccount}>Switch Ethereum Account</button>
    </div>
  );
};

export { WalletContextProvider, WalletInfo };
