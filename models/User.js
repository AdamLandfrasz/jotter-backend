const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^[a-z0-9]+@[a-z]+[.]com$/,
  },
  passwordHash: { type: String, required: true },
  registered: { type: Date, default: Date.now },
  notes: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("User", UserSchema);
