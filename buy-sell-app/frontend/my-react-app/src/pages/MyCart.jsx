

// frontend/src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  


  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cart',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }); // Adjust the API endpoint as needed
      const responseText = await response.text(); // Fetch the response text
      console.log('Fetched cart response text:', responseText); // Debugging line
      const data = JSON.parse(responseText); // Parse the response text as JSON
      console.log('Fetched cart data:', data); // Debugging line
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setMessage('Failed to fetch cart items');
    }
  };

  const removeItem = async (itemId) => {
    try {
      console.log(`Removing item with ID: ${itemId}`);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, config);
      setMessage("Item removed successfully");
      fetchCart(); // Refresh cart items after removal
    } catch (error) {
      console.error("Error removing item:", error);
      setMessage("Failed to remove item");
    }
  };


  const handlePlaceOrder = async () => {
    try {
      console.log('Placing order...'); // Debug statement
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      if (!token) {
        console.error("User is not authenticated"); // Debug if no token found
        alert("User is not authenticated");
        return;
      }
  
      console.log("Token retrieved:", token); // Log the token for debugging
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        // withCredentials: true, // Ensures credentials (cookies) are included in the request
      };
  
      console.log('Sending request to place order...'); // Debug before sending the request
      const response = await axios.post("http://localhost:5000/api/cart/checkout", {}, config);
      console.log('Response from server:', response.data); // Log server response for debugging

      // Store OTP mapping in localStorage
      // const otpMapping = response.data.otpMapping;
      // // localStorage.setItem("otpMapping", JSON.stringify(otpMapping));
      // // localStorage.setItem(response.data.order._id, response.data.otp);

      // try {
      //   // localStorage.setItem("otpMapping", JSON.stringify(otpMapping));
      //   Object.keys(otpMapping).forEach(itemId => {
      //     localStorage.setItem(itemId, otpMapping[itemId]);
      //   });
      // } catch (error) {
      //   console.error("Error storing OTP mapping in localStorage:", error);
      // }
  
      alert("Order placed successfully!");
      // setCartItems([]); // Clear the cart after successful order placement
      fetchCart(); // Refresh cart items after order placement
    } catch (error) {
      console.error("Error placing order:", error); // Log error details
      alert("Failed to place order.");
    }
  };
  
  

  useEffect(() => {
    fetchCart();
  }, []);
  const totalCost = cartItems.reduce((acc, cartItem) => acc + cartItem.item.price, 0);
  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Cart
      </Typography>
      {
      cartItems.length > 0 ? (
        <List>
          {cartItems.map((cartItem) => (
            <ListItem
              key={cartItem._id}
              sx={{
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ListItemText
                primary={cartItem.item.name}
                secondary={`Price: $${cartItem.item.price} | Vendor: ${cartItem.item.vendorName}`}
              />
               
              <IconButton
                color="error"
                onClick={() => removeItem(cartItem.item._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            
          ))}
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Total Cost: ${totalCost.toFixed(2)}
          </Typography>
        </List>
      ) : (
        <Typography variant="body1" align="center">
          Your cart is empty
        </Typography>
      )}
      {message && (
        <Alert
          severity={message.includes("Failed") ? "error" : "success"}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handlePlaceOrder}
        >
          Proceed to Checkout
        </Button>
      )}
    </Box>
  );
};

export default MyCart;
