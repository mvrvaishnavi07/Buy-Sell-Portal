// backend/routes/cartRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addItemToCart,getCartItems,removeItemFromCart,placeOrder} = require("../controllers/cartController");
const router = express.Router();


// Add an item to the cart
router.post("/add", protect, addItemToCart);

// Get the user's cart
router.get("/", protect, getCartItems);

// Remove an item from the cart
router.delete("/remove/:itemId", protect, removeItemFromCart);

router.post("/checkout", protect, placeOrder);



module.exports = router;
