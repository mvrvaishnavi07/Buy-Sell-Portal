import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const ViewItemPage = () => {
  const { id } = useParams(); // Extract item ID from URL
  const [item, setItem] = useState(null); // Store fetched item details
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  // Fetch item details
  const fetchItemDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your auth logic
      const { data } = await axios.get(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItem(data);
    } catch (err) {
      console.error('Error fetching item:', err.message);
      setError('Failed to load item details.');
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  // Add item to cart
//   const addToCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         'http://localhost:5000/api/cart/add',
//         { itemId: id }, // Pass the item ID to the backend
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('Item added to cart successfully!');
//     } catch (err) {
//       console.error('Error adding to cart:', err.message);
//       alert('Failed to add item to cart.');
//     }
//   };
const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User is not authenticated');
        return;
      }
  
      console.log('set req to add item to cart with ID:', id); // Log the item ID
      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        { itemId: id }, // Pass the item ID to the backend
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response from server:', response.data); // Log the server response
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err.message);
      alert('Failed to add item to cart. ');
    }
  };


  if (error) {
    return (
      <Typography color="error" variant="h5" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!item) {
    return (
      <Typography variant="h5" textAlign="center" mt={4}>
        Loading item details...
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {item.name}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Price: ₹{item.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {item.description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Vendor: {item.vendorName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={addToCart}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ViewItemPage;
