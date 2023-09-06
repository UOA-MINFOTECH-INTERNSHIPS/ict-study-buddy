import express from "express";
import { User } from "../db/user-schema.js";

const router = express.Router();

// GET A USER BY USERNAME OR USERID
router.get("/:identifier", async (req, res) => {
  try {
    const identifier = req.params.identifier;

    let user;
    if (identifier.length === 24) {
      user = await User.findById(identifier);
    } else {
      user = await User.findOne({ userName: identifier });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
