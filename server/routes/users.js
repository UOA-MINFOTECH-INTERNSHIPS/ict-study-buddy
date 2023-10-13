import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET A USER BY USERID
router.get("/:id", async (req, res) => {
  try {
    // Find a user by their user ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information from the user object before sending the response
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        // Generate a hashed password if a new password is provided
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      // Update the user's account information
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // Delete a user's account
      await User.findByIdAndDelete(req.params.id);
      res.status(204).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// Get friends of a user
router.get("/friends/:userId", async (req, res) => {
  try {
    // Find a user by their user ID
    const user = await User.findById(req.params.userId);
    // Find the user's friends (users they are following)
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    // Extract relevant friend information
    friends.map((friend) => {
      const { _id, userName, profilePic } = friend;
      friendList.push({ _id, userName, profilePic });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
