import Item from "../../models/Item.js";

// POST /items/claim-request/decline
export default async function declineClaim(req, res) {
  try {
    const { itemId, userId } = req.body;
    // userId here is the claimant, not the owner
    if (!itemId || !userId) {
      return res.status(400).json({ error: "Missing itemId or userId" });
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Only the owner can decline claims
    if (item.userId.toString() !== req.id) {
      return res
        .status(403)
        .json({ error: "Only the owner can decline claims" });
    }
    // Decline the claim for the given userId
    let found = false;
    item.claimRequests.forEach((req) => {
      if (req.userId.toString() === userId) {
        req.status = "declined";
        found = true;
      }
    });
    if (!found) {
      return res.status(404).json({ error: "Claim request not found" });
    }
    await item.save();
    res.json({ message: "Claim declined" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
