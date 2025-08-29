import Item from "../../models/Item.js";

// POST /items/claim-request/accept
export default async function acceptClaim(req, res) {
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
    // Only the owner can accept claims
    if (item.userId.toString() !== req.id) {
      return res
        .status(403)
        .json({ error: "Only the owner can accept claims" });
    }
    // Accept the claim for the given userId, decline all others
    let found = false;
    item.claimRequests.forEach((req) => {
      if (req.userId.toString() === userId) {
        req.status = "accepted";
        found = true;
      } else if (req.status === "pending") {
        req.status = "declined";
      }
    });
    if (!found) {
      return res.status(404).json({ error: "Claim request not found" });
    }
    await item.save();
    res.json({ message: "Claim accepted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
