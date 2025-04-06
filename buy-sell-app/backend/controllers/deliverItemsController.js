

const Item = require("../models/Item");
const User = require("../models/User");
const Order = require("../models/Order");
const getDeliverableItems = async (req, res) => {
  console.log("Fetching deliverable items for the seller...");

  try {
    // Get the current user ID from the request (using authentication middleware to set this)
    const userId = req.user.id;
    console.log("Current user ID (seller):", userId);

    // Fetch orders where the current user is the seller
    const orders = await Order.find({ seller: userId, status: "Pending" })
    .populate ("item", "name price")
    .populate("buyer", "firstName lastName email");
    console.log("Fetched orders for seller:", orders);

    if (orders.length === 0) {
      console.log("No pending orders found for the seller");
      return res.status(404).json({ message: "No pending orders found" });
    }

    // Return the orders that are pending delivery
    // res.status(200).json({ orders });
    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching deliverable items:", error);
    res.status(500).json({ message: "Error fetching deliverable items", error });
  }
};

const deliverItems = async (req, res) => {
    try {
      const { orderId, enteredOTP } = req.body;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const isMatch = await order.verifyOTP(enteredOTP);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect OTP" });
      }
  
      order.status = "Completed";
      await order.save();
  
      res.status(200).json({ message: "Order completed successfully" });
    } catch (error) {
      console.error("Error completing order:", error);
      res.status(500).json({ message: "Error completing order", error });
    }
  };
  
  module.exports = {getDeliverableItems, deliverItems };
  