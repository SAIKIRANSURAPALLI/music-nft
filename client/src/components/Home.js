import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";

const Home = () => {
  const { wallet, connect, disconnect, connected } = useWallet();

  const handleConnect = async () => {
    try {
      if (wallet) {
        await connect();
      } else {
        alert("Please select a Solana wallet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  return (
    <Container>
      <Box textAlign="center" mt={4}>
        <Typography variant="h2" gutterBottom>
          Welcome to the Music NFT App
        </Typography>
        <Typography variant="h5" paragraph>
          Connect your wallet to explore music NFTs!
        </Typography>
        <Box mt={2}>
          {connected ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDisconnect}
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
