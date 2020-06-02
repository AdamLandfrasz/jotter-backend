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
      ...req.body.note,
      owner: req.userId,
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
    const existingNote = await Note.findOne({ _id: req.body.note._id });
    if (!existingNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found!" });
    }
    await existingNote.updateOne(req.body.note);
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

router.delete("/:noteId", authRequired, async (req, res) => {
  try {
    const existingNote = await Note.findOne({ _id: req.params.noteId });
    if (!existingNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found!" });
    }
    await existingNote.remove();
    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
      noteId: req.params.noteId,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
});

module.exports = router;