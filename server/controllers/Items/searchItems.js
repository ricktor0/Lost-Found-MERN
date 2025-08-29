import Item from "../../models/Item.js";

// Search items by name or description (case-insensitive)
const searchItems = async (req, res) => {
  try {
    const q = req.query.q || "";
    const regex = new RegExp(q, "i");
    const items = await Item.find({
      $or: [{ name: regex }, { description: regex }],
    });
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default searchItems;
