import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreateNFT from "./components/CreateNFT";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import { contractAddress, abi } from "./contractConfig";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const instance = new web3Instance.eth.Contract(abi, contractAddress);
          setContract(instance);
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };
    init();
  }, []);
  const handleAccountSwitch = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error switching account:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar account={account} onAccountSwitch={handleAccountSwitch} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard contract={contract} account={account} web3={web3} />
            }
          />
          <Route
            path="/create"
            element={<CreateNFT contract={contract} account={account} />}
          />
          <Route
            path="/profile"
            element={<Profile account={account} contract={contract} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
