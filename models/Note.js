const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, reqired: true },
  sharedWith: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  noteType: { type: String, enum: ["note", "list"], default: "note" },
});

module.exports = mongoose.model("Note", NoteSchema);
