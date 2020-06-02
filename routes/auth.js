const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRequired = require("../middleware/authRequired");

const User = require("../models/User");

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "This username is already in use!" });
    }
    const hash = await bcrypt.hash(req.body.password, 15);
    const newUser = new User({
      email: req.body.email,
      passwordHash: hash,
      notes: [],
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User has been created.", savedUser });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password!" });
    }
    const match = await bcrypt.compare(
      req.body.password,
      existingUser.passwordHash
    );
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password!" });
    }
    const token = jwt.sign(
      { userId: existingUser._id, userEmail: existingUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 60 * 60000),
      })
      .status(200)
      .json({
        success: true,
        message: "User has been successfully authenticated.",
        existingUser,
      });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

router.get("/logout", authRequired, (req, res) => {
  res.clearCookie("auth_token").status(200).json({
    success: true,
    message: "User logged out successfully!",
  });
});

module.exports = router;
