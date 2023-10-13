import express from "express";
import jwt from "jsonwebtoken";
import { Post } from "../db/post-schema.js";
import { User } from "../db/user-schema.js";

const router = express.Router();

// Get the search result of posts
router.get("/posts", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Extract the search query from the request
  const query = req.query.query;

  try {
    // Search for posts that match the query in various fields (userInfos, desc, file, tags, comments)
    const posts = await Post.find({
      $or: [
        { userInfos: { $regex: query, $options: "i" } }, // Search userInfos field (e.g., user name or ID)
        { desc: { $regex: query, $options: "i" } }, // Search post description
        { file: { $regex: query, $options: "i" } }, // Search file information
        { tags: { $regex: query, $options: "i" } }, // Search tags
        { comments: { $regex: query, $options: "i" } }, // Search comments
      ],
    }).populate({
      path: "userInfos",
      select: "userName profilePic", // Populate user information (userName and profilePic)
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get the search result of users
router.get("/users", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Extract the search query from the request
  const query = req.query.query;

  try {
    // Search for users that match the query in various fields (userName, email, desc, courses, skills)
    const users = await User.find({
      $or: [
        { userName: { $regex: query, $options: "i" } }, // Search user names
        { email: { $regex: query, $options: "i" } }, // Search email addresses
        { desc: { $regex: query, $options: "i" } }, // Search user descriptions
        { courses: { $regex: query, $options: "i" } }, // Search courses
        { skills: { $regex: query, $options: "i" } }, // Search skills
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
