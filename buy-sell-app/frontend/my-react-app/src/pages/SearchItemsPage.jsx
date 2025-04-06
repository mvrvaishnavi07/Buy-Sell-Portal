
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchItemsPage = () => {
  const [items, setItems] = useState([]); // Store fetched items
  const [search, setSearch] = useState(""); // Search query
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected filters
  // const [categories] = useState(["Electronics", "Books", "Clothing", "Furniture"]); // Example categories
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const extractCategories = (items) => {
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    setCategories(uniqueCategories);
  };


  const fetchItems = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategories.length > 0) params.category = selectedCategories.join(",");
  
      const token = localStorage.getItem("token"); // Replace with your actual token
      const { data } = await axios.get("http://localhost:5000/api/items", {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       // Filter out items with stock 0 on the frontend if necessary
      const availableItems = data.filter(item => item.stock > 0);
      console.log("Fetched items:", availableItems);
      setItems(availableItems);

      extractCategories(availableItems);
      
      // setItems(data);
      // extractCategories(data);
    } catch (err) {
      console.error("Error fetching items:", err.message);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => setSearch(e.target.value);

  // Handle category filter toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  // Fetch items whenever search or selectedCategories changes
  useEffect(() => {
    fetchItems();
  }, [search, selectedCategories]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Search Items
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search for items"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />
      <Box mb={3}>
        <Typography variant="h6">Filter by Category:</Typography>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </Box>

      
      <Grid container spacing={3}>
  {/* Ensure `items` is an array before calling `.map()` */}
  {Array.isArray(items) && items.length > 0 ? (
    items.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item._id}>
        <Box border={1} borderRadius={2} p={2}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography>{item.description}</Typography>
          <Typography>Price: ₹{item.price}</Typography>
          <Typography>Category: {item.category}</Typography>
          <Typography>Vendor Name : {item.vendorName}</Typography>
          {/* <Button variant="contained" color="primary" fullWidth >
            View Details
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(`/items/${item._id}`)}
          >
            View Details
          </Button>
        </Box>
      </Grid>
    ))
  ) : (
    // If `items` is not an array or is empty, show a message
    <Grid item xs={12}>
      <Typography>No items found</Typography>
    </Grid>
  )}
</Grid>

    </Box>
  );
};

export default SearchItemsPage;
