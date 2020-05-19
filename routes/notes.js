const express = require("express");
const router = express.Router();

const authRequired = require("../middleware/authRequired");

const Note = require("../models/Note");

router.get("/", authRequired, async (req, res) => {
  try {
    const userNotes = await Note.find({ owner: req.userId });
    res.status(200).json({ success: true, userNotes });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

module.exports = router;
