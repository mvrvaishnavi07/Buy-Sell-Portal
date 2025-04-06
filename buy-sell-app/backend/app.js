require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderHistoryRoutes = require("./routes/orderHistoryRoutes");
const deliverItemsRoutes = require("./routes/deliverItemsRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");  // Import chatbot route

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");  // Success message
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);  // Error message
});

app.get("/", (req, res) => {
  res.send("Welcome to the Buy-Sell portal!");
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes); 
app.use("/api/cart", cartRoutes);
app.use("/api/orders-history", orderHistoryRoutes);
app.use("/api/deliver-items", deliverItemsRoutes);
app.use("/api/chatbot", chatbotRoutes); 

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
