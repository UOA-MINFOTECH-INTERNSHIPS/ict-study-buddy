import express from "express";
import { User } from "../db/user-schema.js";
import { Post } from "../db/post-schema.js";
import { Comment } from "../db/comment-schema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

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

//Add a comment
router.post("/:id", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const userInfo = await verifyToken(token); // Get user information from the token
  const currentUserId = userInfo.userId; // Get the current user's ID from the token
  const desc = req.body.desc; // Get the comment description from the request body

  try {
    const currentUser = await User.findById(currentUserId); //Find the current user

    const post = await Post.findById(req.params.id); //Find the post by postId
    // Create a new comment
    const newComment = new Comment({
      desc: desc,
      userId: currentUserId,
      userName: currentUser.userName,
      postId: post._id,
      profilePic: currentUser.profilePic,
    });
    //Save the new comment
    const comment = await newComment.save();
    // Update the post to include the new comment
    // await post.updateOne({ $push: { comments: comment } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get comments
router.get("/:id", async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err) => {
      if (err) return res.status(403).json("Token is not valid!");
    });
  
    const postId = req.params.id; //Get the post id from the request params
  
    try {
      const comments = await Comment.find({ postId: postId }); // Find the comments ralated to the post
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  });

export default router;
