import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const MyComponent = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        console.log("Account changed to:", accounts[0]);
      } else {
        setAccount("");
        console.log("No account selected");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const promptSwitchAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log("Account selected:", accounts[0]);
        }
      } catch (error) {
        console.error("Error requesting accounts:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  return (
    <div>
      <p>Current Account: {account}</p>
      <Button variant="outlined" color="primary" onClick={promptSwitchAccount}>
        Switch MetaMask Account
      </Button>
    </div>
  );
};

export default MyComponent;
