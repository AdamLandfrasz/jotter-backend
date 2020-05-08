const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, reqired: true },
  sharedWith: [mongoose.SchemaTypes.ObjectId],
  title: String,
  content: String,
  noteType: { type: String, enum: ["note", "list"], default: "note" },
});

module.exports = mongoose.model("Note", NoteSchema);
