import Item from "../../models/Item.js";
import User from "../../models/User.js";

// POST /items/claim-request
export default async function claimRequest(req, res) {
  try {
    const { itemId } = req.body;
    const userId = req.id;
    if (!itemId || !userId) {
      return res.status(400).json({ error: "Missing itemId or userId" });
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Prevent owner from claiming their own item
    if (item.userId.toString() === userId) {
      return res
        .status(400)
        .json({ error: "Owner cannot claim their own item" });
    }
    // Prevent duplicate claim
    if (item.claimRequests.some((r) => r.userId.toString() === userId)) {
      return res
        .status(400)
        .json({ error: "You have already sent a claim request" });
    }
    item.claimRequests.push({
      userId,
      status: "pending",
      createdAt: new Date(),
    });
    await item.save();
    res.json({ message: "Claim request sent!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
