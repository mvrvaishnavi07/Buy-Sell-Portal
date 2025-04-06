const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // vendor: { type: String, required: true }, // Vendor name
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorName: { type: String, required: true },
  stock: { type: Number, default: 1 }, // Optional: Track available stock
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Item", itemSchema);
