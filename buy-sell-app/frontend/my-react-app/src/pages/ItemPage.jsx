import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, Box } from "@mui/material";

const itemsData = [
  { id: 1, name: "Laptop", price: 50000, vendor: "John", category: "Electronics", description: "A high-performance laptop with the latest processor." },
  { id: 2, name: "Phone", price: 30000, vendor: "Alice", category: "Electronics", description: "A sleek smartphone with advanced camera features." },
  { id: 3, name: "Desk Chair", price: 4000, vendor: "Bob", category: "Furniture", description: "An ergonomic desk chair with adjustable height." },
  { id: 4, name: "Monitor", price: 15000, vendor: "Mike", category: "Electronics", description: "A 4K UHD monitor with vivid colors." },
  { id: 5, name: "Bookshelf", price: 8000, vendor: "Sara", category: "Furniture", description: "A wooden bookshelf with multiple compartments." },
];

const ItemPage = () => {
  const { id } = useParams(); // Get the item's ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  // Fetch the item details using the ID
  useEffect(() => {
    const foundItem = itemsData.find((item) => item.id === parseInt(id));
    setItem(foundItem);
  }, [id]);

  const handleAddToCart = () => {
    // Add the item to the cart (using localStorage or state management)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = cart.some((cartItem) => cartItem.id === item.id);

    if (!isAlreadyInCart) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.name} has been added to your cart!`);
    } else {
      alert(`${item.name} is already in your cart.`);
    }

    // Optionally, navigate to the My Cart page
    navigate("/cart");
  };

  if (!item) {
    return <Typography>Loading item details...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Vendor: {item.vendor}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{item.price}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {item.description}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemPage;
