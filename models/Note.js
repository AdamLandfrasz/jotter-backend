const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, reqired: true },
  sharedWith: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
  title: { type: String, default: "" },
  content: { type: mongoose.SchemaTypes.Mixed, default: "" },
  noteType: { type: String, enum: ["note", "list"], default: "note" },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
