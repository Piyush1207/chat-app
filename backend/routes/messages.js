const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET /api/messages — fetch last 50 messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 }) // oldest first
      .limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;