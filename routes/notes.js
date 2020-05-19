const express = require("express");
const router = express.Router();

const authRequired = require("../middleware/authRequired");

const Note = require("../models/Note");

router.get("/", authRequired, async (req, res) => {
  try {
    const userNotes = await Note.find({ owner: req.userId });
    res.status(200).json({
      success: true,
      message: "Notes returned successfully.",
      userNotes,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

router.post("/", authRequired, async (req, res) => {
  try {
    const newNote = new Note({
      owner: req.userId,
      sharedWith: [],
      title: req.body.title || "",
      content: req.body.content || "",
      noteType: req.body.type || undefined,
    });
    const savedNote = await newNote.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      savedNote,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

router.put("/", authRequired, async (req, res) => {
  try {
    await Note.updateOne({ _id: req.body.note._id }, req.body.note);
    const editedNote = await Note.findOne({ _id: req.body.note._id });
    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      editedNote,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

router.delete("/", authRequired, (req, res) => {});

module.exports = router;
