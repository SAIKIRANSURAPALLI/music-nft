import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container style={{ marginTop: "40px" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Music NFT App
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover, create, and trade unique music NFTs.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create"
          style={{ margin: "10px" }}
        >
          Create Your Music NFT
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/dashboard"
          style={{ margin: "10px" }}
        >
          Go to Dashboard
        </Button>
      </div>

      {/* Featured NFTs Section */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        Popular Music NFTs
      </Typography>

      {/* Grid of NFT Cards */}
      <Grid container spacing={4}>
        {/* Example NFT Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              style={{ height: "200px" }}
              image="https://source.unsplash.com/random/1"
              title="Music NFT 1"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Music NFT 1
              </Typography>
              <Typography variant="body2" color="textSecondary">
                A unique track created by Artist A. Explore the vibrant
                soundscapes of this NFT.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              style={{ height: "200px" }}
              image="https://source.unsplash.com/random/2"
              title="Music NFT 2"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Music NFT 2
              </Typography>
              <Typography variant="body2" color="textSecondary">
                A new hit by Artist B. Get your hands on this exclusive track
                before it’s gone.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              style={{ height: "200px" }}
              image="https://source.unsplash.com/random/3"
              title="Music NFT 3"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Music NFT 3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Experience the fusion of music and blockchain with Artist C’s
                masterpiece.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Call to Action */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/explore"
          style={{ marginRight: "16px" }}
        >
          Explore More NFTs
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/profile"
        >
          View Your Profile
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;
