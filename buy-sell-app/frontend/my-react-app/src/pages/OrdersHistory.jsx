import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Tabs, Tab } from "@mui/material";

const OrderHistory = () => {
  const [orders, setOrders] = useState({ pendingOrders: [], boughtItems: [], soldItems: [] });
  const [tabIndex, setTabIndex] = useState(0);
  const [otpMapping, setOtpMapping] = useState({});

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders..."); // Debug statement
  
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
  
      console.log("Sending request to fetch orders..."); // Debug before sending the request
      const response = await axios.get("http://localhost:5000/api/orders-history", config);
      
      console.log("Response from server:", response.data); // Log server response for debugging
      setOrders(response.data); // Update state with fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error); // Log error details
      alert("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    // Fetch OTP mapping from localStorage
    // const storedOtpMapping = JSON.parse(localStorage.getItem("otpMapping"));
    // setOtpMapping(storedOtpMapping);
    try {
      Object.keys(localStorage).forEach(itemId => {
        otpMapping[itemId] = JSON.parse(localStorage.getItem(itemId));
      });
      // setOtpMapping(storedOtpMapping ? JSON.parse(storedOtpMapping) : {});
      setOtpMapping(otpMapping);
    } catch (error) {
      console.error("Error parsing OTP mapping from localStorage:", error);
      setOtpMapping({});
    }
    fetchOrders();
  }, []);
  

return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
        <Tab label="Pending Orders" />
        <Tab label="Bought Items" />
        <Tab label="Sold Items" />
      </Tabs>

      {/* Pending Orders */}
      {tabIndex === 0 && (
        <>
          {orders.pendingOrders.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No pending orders.</Typography>
          ) : (
            orders.pendingOrders.map((order) => (
              <Card key={order._id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{order.item.name} - ${order.item.price}</Typography>
                  <Typography variant="body2">
                    Vendor: {order.seller.firstName} {order.seller.lastName} ({order.seller.email})
                  </Typography>
                  <Typography variant="body2">Status: {order.status}</Typography>
                  <Typography variant="body2">OTP: {order.otp}</Typography>
                  {/* Display OTP from localStorage if available */}
                  {/* {otpMapping[order.item._id] ? (
                    <Typography variant="body2">
                      OTP: <strong>{otpMapping[order.item._id]}</strong>
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      OTP: Not available (You might have cleared your storage)
                    </Typography>
                  )} */}
                  <Typography variant="body2">Transaction ID : {order.transactionId}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </>
      )}

      {/* Bought Items */}
      {tabIndex === 1 && (
        <>
          {orders.boughtItems.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No bought items.</Typography>
          ) : (
            orders.boughtItems.map((order) => (
              <Card key={order._id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{order.item.name} - ${order.item.price}</Typography>
                  <Typography variant="body2">
                    Vendor: {order.seller.firstName} {order.seller.lastName} ({order.seller.email})
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </>
      )}

      {/* Sold Items */}
      {tabIndex === 2 && (
        <>
          {orders.soldItems.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No sold items.</Typography>
          ) : (
            orders.soldItems.map((order) => (
              <Card key={order._id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{order.item.name} - ${order.item.price}</Typography>
                  <Typography variant="body2">
                    Buyer: {order.buyer.firstName} {order.buyer.lastName} ({order.buyer.email})
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default OrderHistory;
