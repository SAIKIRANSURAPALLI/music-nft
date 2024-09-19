import React, { useState } from "react";
import { Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Web3Storage } from "web3.storage";

const getAccessToken = () => {
  return "YOUR_WEB3STORAGE_API_TOKEN";
};
const makeStorageClient = () => {
  return new Web3Storage({ token: getAccessToken() });
};
const uploadToIPFS = async (file) => {
  const client = makeStorageClient();
  try {
    const fileArray = [new File([file], file.name)];
    const cid = await client.put(fileArray);
    const fileUrl = `https://${cid}.ipfs.w3s.link/${file.name}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw new Error("Failed to upload file to IPFS.");
  }
};

const CreateNFT = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateNFT = async () => {
    try {
      if (!file) {
        alert("Please select a file");
        return;
      }

      const fileUrl = await uploadToIPFS(file);

      await contract.methods
        .createNFT(name, description, fileUrl)
        .send({ from: account });

      alert("NFT created successfully!");
    } catch (error) {
      console.error("Error creating NFT:", error);
      alert("Error creating NFT");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create NFT
      </Typography>
      <Paper style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNFT}
            >
              Create NFT
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CreateNFT;
