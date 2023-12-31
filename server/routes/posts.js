import express from "express";
import jwt from "jsonwebtoken";
import { Post } from "../db/post-schema.js";
import { User } from "../db/user-schema.js";

const router = express.Router();

// CREATE A POST
router.post("/", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Extract user information from the token
  const userInfo = await verifyToken(token);

  // Create a new post with data from the request body
  const newPost = new Post({
    userInfos: userInfo.userId, // Set the user ID
    desc: req.body.desc,
    file: {
      name: req.body.file.name,
      url: req.body.file.url,
    },
    tags: req.body.tags,
  });

  try {
    // Save the new post to the database
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Extract user information from the token
  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;
  const postId = req.params.id;

  try {
    // Find the post by its ID
    const post = await Post.findById(postId);

    if (post.userInfos === currentUserId) {
      // Check if the user owns the post
      // Delete the post if the user is the owner
      await post.deleteOne();
      res.status(204).json("Post has been deleted.");
    } else {
      return res.status(403).json("You can only delete your own post.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE A POST
router.put("/:id", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  // Extract user information from the token
  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;
  const postId = req.params.id;

  try {
    // Find the post by its ID
    const post = await Post.findById(postId);

    if (post.userInfos === currentUserId) {
      // Check if the user owns the post
      // Update the post with the new data from the request body
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated.");
    } else {
      return res.status(403).json("You can only update your own post.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET POSTS BY USERID
router.get("/", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  // Extract user information from the token
  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;

  const profileUserId = req.query.userId;

  try {
    let posts;

    // If profileUserId is defined, get posts for a specific user
    if (profileUserId !== "undefined") {
      posts = await Post.find({ userInfos: profileUserId }).populate({
        path: "userInfos",
        select: "userName profilePic",
      });
    } else {
      // Otherwise, fetch community posts (following posts)
      const currentUser = await User.findById(currentUserId);
      const followingIds = currentUser.followings;
      posts = await Post.find({
        userInfos: { $in: [currentUser._id, ...followingIds] },
      })
        .populate({
          path: "userInfos",
          select: "userName profilePic",
        })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function verifyToken(token) {
  // Verify the provided token and return user information
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

// Like or Dislike a Post
router.put("/:id/like", async (req, res) => {
  // Verify if the user is authenticated (has a valid token)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  // Extract user information from the token
  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;

  const post = await Post.findById(req.params.id);

  try {
    if (!post.likes.includes(currentUserId)) {
      // Check if the user has already liked the post
      // Toggle the like status by adding or removing the user ID from the likes array
      await post.updateOne({ $push: { likes: currentUserId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } });
      res.status(204).json("The post has been disliked");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get posts created in the last two days
router.get("/recent-posts", async (req, res) => {
  try {
    // Calculate the date two days ago from the current date
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    // Find posts created after two days ago
    const recentPosts = await Post.find({
      createdAt: { $gte: oneDayAgo },
    })
      .populate({
        path: "userInfos",
        select: "userName profilePic",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(recentPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
