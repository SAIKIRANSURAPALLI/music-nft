import React, { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
  const { wallet, connect, disconnect, connected } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { connection } = useConnection();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    handleMenuClose();
    navigate("/");
  }, [disconnect, navigate]);

  const handleSwitchAccount = useCallback(() => {
    if (wallet) {
      wallet.adapter
        .request({ method: "solana_requestAccounts" })
        .then((accounts) => {
          console.log("Accounts:", accounts);
        })
        .catch((error) => {
          console.error("Error switching account:", error);
        });
    } else {
      alert("Please connect a Solana wallet.");
    }
    handleMenuClose();
  }, [wallet]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleConnect = async () => {
    try {
      if (wallet) {
        await connect();
        navigate("/home");
      } else {
        alert("Please select a Solana wallet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Music NFT App
        </Typography>
        <button className="navbar-burger" onClick={toggleMobileMenu}>
          ☰
        </button>
        <div className={`navbar-menu ${isMobileMenuOpen ? "is-active" : ""}`}>
          {connected ? (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                {wallet?.adapter.name || "Wallet"}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleSwitchAccount}>
                  Switch Account
                </MenuItem>
                <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
          <Button color="inherit" onClick={() => handleNavigate("/create")}>
            Create NFT
          </Button>
          <Button color="inherit" onClick={() => handleNavigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => handleNavigate("/profile")}>
            Profile
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
