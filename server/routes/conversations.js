import express from "express";
import { Conversation } from "../db/conversation-schema.js";

const router = express.Router();

// Create a new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversations of a user
router.get("/:userId", async (req, res) => {
  try {
    // Find conversations that include the specified user ID as a member
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a conversation that includes two specific user IDs
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    // Find a conversation that includes both of the specified user IDs
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;