import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Stack,
} from "@mui/material";

const AddItemToSell = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 1, // Default value
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/items", // Backend route for adding an item
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: 1,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Item to Sell
      </Typography>

      {/* Success and Error Messages */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Item Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />

        <TextField
          label="Price"
          type="number"
          variant="outlined"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <TextField
          label="Category"
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <TextField
          label="Stock (Optional)"
          type="number"
          variant="outlined"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      </Box>
    </Container>
  );
};

export default AddItemToSell;
