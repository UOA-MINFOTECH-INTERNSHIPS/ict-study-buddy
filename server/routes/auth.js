import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  // Generate a hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user with hashed password
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    // Save the new user to the database
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // Find a user by their email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // If the user is not found, return an error
      res.status(400).json("User not found");
    }

    // Validate the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      // If the password is incorrect, return an error
      res.status(400).json("Wrong Password or username");
    }

    // After successfully finding the user and validating the password,
    // generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "30d", // Token expiration period
    });

    // Remove the password from the user object (for security)
    const { password, ...others } = user._doc;

    // Save the token into a secure HTTP-only cookie
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    // Handle any errors that occur during login
    res.status(500).json(err);
  }
});

export default router;
