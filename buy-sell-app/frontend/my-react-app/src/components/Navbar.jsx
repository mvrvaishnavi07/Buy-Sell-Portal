import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton , Button} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the dropdown menu
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 2 }}>
          {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            
          </Link> */}
          IIIT Buy-Sell
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/search">
          Search Items
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          My Cart
        </Button>
        <Button color="inherit" component={Link} to="/orders-history">
          Orders History
        </Button>
        <Button color="inherit" component={Link} to="/deliver-items">
          Deliver Items
        </Button>
        <Button color="inherit" component={Link} to="/chatsupport">
          ChatBot
        </Button>
        <Button color="inherit" component={Link} to="/add-item">
          Add Item to Sell
        </Button>

        
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls="profile-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
        {/* Profile Dropdown Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
