import React from "react";
import { Typography, Container, Grid, Button, Box } from "@mui/material";
import "../styles/Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  return (
    <Container maxWidth="lg" className="container">
      <Box className="box">
        {/* Header Section */}
        <Typography
          variant="h1"
          gutterBottom
          className="header"
        >
          Welcome to Buy-Sell Portal!
        </Typography>
        <Typography
          variant="h3"
          className="subHeader"
        >
          Your one-stop platform to buy and sell products with ease. Discover
          amazing deals or list your items for sale.
        </Typography>

        {/* Content Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Image Section */}
          {/* <Grid item xs={12} md={6}>
            <Box
              component="img"
              // src="frontend/my-react-app/src/assets/img2.jpeg"
              src={new URL('../assets/img2.jpeg', import.meta.url).href}
              alt="Buy-Sell Portal"
              className="imgBox"
            />
          </Grid> */}

          {/* Call to Action Section */}
      
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
