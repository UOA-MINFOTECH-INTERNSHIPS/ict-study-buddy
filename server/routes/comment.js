import express from "express";
import { User } from "../db/user-schema.js";
import { Post } from "../db/post-schema.js";
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

  const userInfo = await verifyToken(token); //Get userInfo
  const currentUserId = userInfo.userId; //Get currentuser id

  const desc = req.body.desc; //Get comment description

  try {
    const currentUser = await User.findById(currentUserId); //Find the current user

    const newComment = {
      desc: desc,
      userId: currentUserId,
      userName: currentUser.userName,
    }; //Create a newComment

    const post = await Post.findById(req.params.id); //Find the post

    await post.updateOne({ $push: { comments: newComment } }); //Update the post comment
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
