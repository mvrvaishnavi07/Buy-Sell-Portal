// backend/controllers/cartController.js
const Item = require("../models/Item");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// const Order = require("../models/Order");
// const { generateOTP } = require('./utils'); // Import the generateOTP function
// const bcrypt = require('bcrypt');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addItemToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    // Ensure the user is not adding their own item
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.vendor.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot add your own item to the cart" });
    }

    // Add the item to the user's cart if it's not already there
    const user = await User.findById(req.user._id);
    const alreadyInCart = user.cart.some((cartItem) => cartItem.item.toString() === itemId);
    if (alreadyInCart) {
      return res.status(400).json({ message: "Item is already in your cart" });
    }

    user.cart.push({ item: itemId });
    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};



const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart.item",
      select: "name price vendor",
      populate: { path: "vendorName", select: "name" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};




const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log("Item ID to remove:", itemId);

    const user = await User.findById(req.user._id);
    console.log("User's cart before removal:", user.cart);
    const updatedCart = user.cart.filter((cartItem) => cartItem.item.toString() !== itemId);

    if (updatedCart.length === user.cart.length) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    user.cart = updatedCart;
    await user.save();

    console.log("User's cart after removal:", user.cart);

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

const Order = require("../models/Order");
const crypto = require("crypto");

// Function to generate a random OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const generateTransactionId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // Optional: Format the timestamp and random number if you want
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomNum}`;
};

const placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.item");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const orders = [];
    // const otpMap = {};

    for (let cartItem of user.cart) {
      const OTP = generateOTP();
      TransactionId = generateTransactionId();
      const salt = await bcrypt.genSalt(10); // Create salt for hashing OTP
      const hashedOTP = await bcrypt.hash(OTP, salt); // Hash the OTP

      const order = new Order({
        item: cartItem.item._id,
        buyer: req.user._id,
        seller: cartItem.item.vendor,
        otp : OTP,
        otpHash: hashedOTP,
        transactionId: TransactionId
      });


      
      console.log("Transaction ID:", order.transactionId);

      await order.save();
      orders.push(order);
      // otpMap[cartItem.item._id] = OTP; // Map the item ID

      // Update the item stock to 0 after placing the order
      const item = await Item.findById(cartItem.item._id);

      if (item) {
        item.stock = 0; // Set stock to 0 since the item has been ordered
        await item.save(); // Save the updated item
      }
    }

    // Empty the user's cart
    user.cart = [];
    await user.save();
    res.status(200).json({
      message: "Order placed successfully",
      orders,
      // otps: otpMap, // Send OTPs to frontend
    });

    // res.status(200).json({ message: "Order placed successfully", orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
};




module.exports = { addItemToCart,getCartItems,removeItemFromCart, placeOrder};
