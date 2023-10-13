import express from "express";
import { User } from "../db/user-schema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Function to verify a JWT token and extract user information
async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) {
        reject(err);
      } else {
        resolve(userInfo);
      }
    });
  });
}

// Follow or Unfollow a User
router.put("/:id/follow", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  // Verify and extract user information from the token
  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;

  if (currentUserId !== req.params.id) {
    try {
      // Find the user to follow/unfollow and the current user
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(currentUserId);

      if (!user.followers.includes(currentUserId)) {
        // If the current user is not already following the target user
        await user.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        // If the current user is already following the target user, unfollow
        await user.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cannot follow or unfollow yourself.");
  }
});

// Get all followers of a user
router.get("/:id/followers", async (req, res) => {
  try {
    // Find the user by ID and retrieve their followers
    const user = await User.findById(req.params.id);
    const followers = user.followers;
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users that a user is following
router.get("/:id/followings", async (req, res) => {
  try {
    // Find the user by ID and retrieve the users they are following
    const user = await User.findById(req.params.id);
    const followings = user.followings;
    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
