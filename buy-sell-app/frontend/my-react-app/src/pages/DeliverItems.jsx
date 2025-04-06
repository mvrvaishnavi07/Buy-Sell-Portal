import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, TextField, Button, Grid, CircularProgress, Alert } from "@mui/material";
const DeliverItems = () => {
  const [deliverItems, setDeliverItems] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});

  

  const fetchDeliverItems = async () => {
    try {
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
        
      };
      const response = await axios.get("http://localhost:5000/api/deliver-items",config);
    //   setDeliverItems(response.data);
    if (response.data && response.data.length > 0) {
        setDeliverItems(response.data);
      } else {
        setDeliverItems([]); // Set to an empty array if no items to be delivered
      }
    } catch (error) {
      console.error("Error fetching deliver items:", error);
    }
  };

  const handleOTPChange = (orderId, value) => {
    setOtpInputs((prev) => ({ ...prev, [orderId]: value }));
  };


const handleDeliver = async (orderId) => {
    try {
      console.log("Initiating delivery for order:", orderId); // Debug statement
      
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
      };
      
      console.log("Sending request to deliver the item..."); // Debug before sending the request
      
      const response = await axios.post(
        "http://localhost:5000/api/deliver-items",
        { orderId, enteredOTP: otpInputs[orderId] },
        config
      );
      
      console.log("Response from server:", response.data); // Log server response for debugging
      
      alert("Order delivered successfully!");
      setDeliverItems((prevItems) => 
        prevItems.filter((order) => order._id !== orderId) // Remove the delivered order
      );
      // fetchDeliverItems(); // Refresh list after delivery

      // fetchDeliverItems();

    } catch (error) {
      console.error("Error delivering order:", error); // Log error details
      alert("Failed to deliver the order.");
    }
  };
  

  useEffect(() => {
    fetchDeliverItems();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Deliver Items
      </Typography>

      {deliverItems.length === 0 ? (
        <Typography>No items to deliver.</Typography>
      ) : (
        deliverItems.map((order) => (
          <Card key={order._id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6">{order.item.name} - ${order.item.price}</Typography>
              <Typography variant="body2">
                Buyer: {order.buyer.firstName} {order.buyer.lastName} ({order.buyer.email})
              </Typography>

              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otpInputs[order._id] || ""}
                onChange={(e) => handleOTPChange(order._id, e.target.value)}
              />

              <Button variant="contained" color="primary" onClick={() => handleDeliver(order._id)}>
                Deliver
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default DeliverItems;
