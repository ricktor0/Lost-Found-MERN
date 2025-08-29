export const acceptClaimRequest = async (req, res) => {
  try {
    const { itemId, userId } = req.body;
    if (!itemId || !userId) {
      return res.status(400).json({ error: "Missing itemId or userId" });
    }
    const item = await Item.findById(itemId).populate(
      "userId",
      "email number fullname nickname"
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Mark claim as accepted, set all others to declined
    let found = false;
    item.claimRequests.forEach((r) => {
      if (r.userId.toString() === userId) {
        r.status = "accepted";
        found = true;
      } else if (r.status !== "declined") {
        r.status = "declined";
      }
    });
    if (!found) {
      return res.status(404).json({ error: "Claim request not found" });
    }
    await item.save();
    // Return owner's contact info
    const owner = item.userId;
    return res.status(200).json({
      message: "Claim accepted!",
      ownerContact: {
        email: owner.email,
        number: owner.number,
        name: owner.fullname || owner.nickname || "",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const declineClaimRequest = async (req, res) => {
  try {
    const { itemId, userId } = req.body;
    if (!itemId || !userId) {
      return res.status(400).json({ error: "Missing itemId or userId" });
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Set the declined claim request's status to 'declined'
    let found = false;
    item.claimRequests.forEach((r) => {
      if (r.userId.toString() === userId) {
        r.status = "declined";
        found = true;
      }
    });
    if (!found) {
      return res.status(404).json({ error: "Claim request not found" });
    }
    await item.save();
    return res.status(200).json({ message: "Claim declined." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
import Item from "../../models/Item.js";
import User from "../../models/User.js";

export const claimRequestController = async (req, res) => {
  try {
    const { itemId } = req.body;
    const token = req.headers.token;
    // You should verify the token and get the userId from it in production
    // For now, get userId from req.user if using validateJWT, or from token (not secure)
    // Here, we assume req.user is set by validateJWT middleware
    let userId = req.user?._id || null;
    if (!userId && token) {
      // fallback: decode token (not secure, for demo only)
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      userId = payload.id;
    }
    if (!itemId || !userId) {
      return res.status(400).json({ error: "Missing itemId or userId" });
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Prevent duplicate pending/accepted claim requests from same user
    if (
      item.claimRequests.some(
        (r) => r.userId.toString() === userId && r.status !== "declined"
      )
    ) {
      return res.status(400).json({
        error: "You have already sent a claim request for this item.",
      });
    }
    item.claimRequests.push({ userId, status: "pending" });
    await item.save();
    return res.status(200).json({ message: "Claim request received!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
