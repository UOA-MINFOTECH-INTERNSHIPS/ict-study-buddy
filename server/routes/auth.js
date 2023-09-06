import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  //generate hashedpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
