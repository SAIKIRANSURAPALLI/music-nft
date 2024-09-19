import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Web3 from "web3";
import { fetchNFTs } from "../utils/fetchNFTs";

const Dashboard = ({ contract }) => {
  const [nfts, setNfts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
            fetchNFTs(accounts[0]);
          });
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (web3 && account) {
        const ethBalance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(ethBalance, "ether"));
      }
    };

    fetchBalance();
  }, [web3, account]);

  useEffect(() => {
    const fetchNFTsData = async (account) => {
      try {
        if (contract && account) {
          const nftCount = await contract.methods.balanceOf(account).call();
          const nftPromises = [];
          for (let i = 0; i < nftCount; i++) {
            nftPromises.push(
              contract.methods.tokenOfOwnerByIndex(account, i).call()
            );
          }
          const nftIds = await Promise.all(nftPromises);

          const nftDetailsPromises = nftIds.map(async (id) => {
            const tokenURI = await contract.methods.tokenURI(id).call();
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            const value = await contract.methods.trackPrices(id).call();

            return { id, ...metadata, value };
          });

          const nftDetails = await Promise.all(nftDetailsPromises);
          setNfts(nftDetails);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    if (account) {
      fetchNFTsData(account);
    }
  }, [contract, account]);

  const handleTrade = async (nftId) => {
    try {
      console.log(`Initiating trade for NFT ID: ${nftId}`);
    } catch (error) {
      console.error("Trade error:", error);
    }
  };

  const switchAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Switched to account:", accounts[0]);
        fetchNFTs(accounts[0]);
      } catch (error) {
        console.error("Error switching accounts:", error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Display user account and balance */}
      <Typography variant="h6">Account: {account}</Typography>
      <Typography variant="h6">Balance: {balance} ETH</Typography>
      <Button variant="outlined" color="primary" onClick={switchAccount}>
        Switch MetaMask Account
      </Button>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <Grid item xs={12} sm={6} md={4} key={nft.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">NFT ID: {nft.id}</Typography>
                  <Typography variant="body2">Name: {nft.name}</Typography>
                  <Typography variant="body2">
                    Description: {nft.description}
                  </Typography>
                  <Typography variant="body2">
                    Value: {web3.utils.fromWei(nft.value, "ether")} ETH
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleTrade(nft.id)}
                  >
                    Trade
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No NFTs found</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
