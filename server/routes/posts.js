import express from "express";
import { Post } from "../db/post-schema.js";

const router = express.Router();

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const Post = await newPost.save();
    res.status(200).json(Post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted.");
    } else {
      return res.status(403).json("You can only delete your own post.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
