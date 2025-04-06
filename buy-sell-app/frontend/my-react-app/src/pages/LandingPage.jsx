import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{ textAlign: "center", marginTop: "120px" }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Buy-Sell Portal
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 1 }}
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ margin: 1 }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Container>
  );
};

export default LandingPage;
