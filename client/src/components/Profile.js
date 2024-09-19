import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";

const Profile = ({ account, contract }) => {
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    const fetchUserNFTs = async () => {
      try {
        if (contract && account) {
          // Fetch the number of NFTs owned by the account
          const nftCount = await contract.methods.balanceOf(account).call();

          // Fetch the IDs of the NFTs owned by the account
          const nftPromises = [];
          for (let i = 0; i < nftCount; i++) {
            nftPromises.push(
              contract.methods.tokenOfOwnerByIndex(account, i).call()
            );
          }
          const nftIds = await Promise.all(nftPromises);

          // Fetch details for each NFT
          const nftDetailsPromises = nftIds.map(async (id) => {
            const tokenURI = await contract.methods.tokenURI(id).call();
            const response = await fetch(tokenURI);
            const metadata = await response.json();

            return { id, ...metadata };
          });

          const nftDetails = await Promise.all(nftDetailsPromises);
          setUserNFTs(nftDetails);
        }
      } catch (error) {
        console.error("Error fetching user NFTs:", error);
      }
    };

    fetchUserNFTs();
  }, [contract, account]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6" gutterBottom>
        Account: {account}
      </Typography>
      <Grid container spacing={3}>
        {userNFTs.length > 0 ? (
          userNFTs.map((nft) => (
            <Grid item xs={12} sm={6} md={4} key={nft.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">NFT ID: {nft.id}</Typography>
                  <Typography variant="body2">Name: {nft.name}</Typography>
                  <Typography variant="body2">
                    Description: {nft.description}
                  </Typography>
                </CardContent>
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

export default Profile;
