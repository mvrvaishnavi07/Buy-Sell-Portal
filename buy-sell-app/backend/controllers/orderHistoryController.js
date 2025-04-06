
const Item = require("../models/Item");
const User = require("../models/User");
const Order = require("../models/Order");
// const crypto = require("crypto");


const getOrders = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const pendingOrders = await Order.find({ buyer: userId, status: "Pending" })
        .populate("item", "name price")
        .populate("seller", "firstName lastName email");
  
      const boughtItems = await Order.find({ buyer: userId, status: "Completed" })
        .populate("item", "name price")
        .populate("seller", "firstName lastName email");
  
      const soldItems = await Order.find({ seller: userId, status: "Completed" })
        .populate("item", "name price")
        .populate("buyer", "firstName lastName email");
  
      res.status(200).json({ pendingOrders, boughtItems, soldItems });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };
  
  module.exports = { getOrders };
  