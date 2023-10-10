import express from "express";
import jwt from "jsonwebtoken";
import { Post } from "../db/post-schema.js";
import { User } from "../db/user-schema.js";

const router = express.Router();

//Get the search result of post
router.get("/posts", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  const query = req.query.query;

  try {
    const posts = await Post.find({
      $or: [
        { userInfos: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
        { file: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { comments: { $regex: query, $options: "i" } },
      ],
    }).populate({
      path: "userInfos",
      select: "userName profilePic",
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get the search result of user
router.get("/users", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  const query = req.query.query;

  try {
    const posts = await User.find({
      $or: [
        { userName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
        { courses: { $regex: query, $options: "i" } },
        { skills: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
