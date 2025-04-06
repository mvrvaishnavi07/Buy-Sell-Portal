// const Item = require("../models/Item");

const Item = require("../models/Item");
const User = require("../models/User");


// Get items with search and filter
exports.getItems = async (req, res) => {
  try {
    const { search, category } = req.query;

    // Build query object dynamically
    const query = {};

    // Case-insensitive search on item name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category if provided
    if (category) {
      query.category = { $in: category.split(",") }; // Handle multiple categories
    }

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};



// Add a new item
exports.addItem = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the authenticated user (seller)
    const seller = await User.findById(req.user.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }

    // Create the new item
    const newItem = new Item({
      name,
      description,
      price,
      category,
      vendor: seller._id, // Reference to the seller's ID
      vendorName: `${seller.firstName} ${seller.lastName}`, // Store the seller's name
      stock: stock || 1, // Default stock to 1 if not provided
    });

    const savedItem = await newItem.save();

    // Update the user's itemsForSale field
    await User.findByIdAndUpdate(seller._id, {
      $push: { itemsForSale: savedItem._id },
    });

    res.status(201).json({
      message: "Item added successfully.",
      item: savedItem,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// module.exports = { addItem };

// Fetch a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("vendor"); // Populate vendor details if it's a reference
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};