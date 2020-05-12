const express = require("express");
const router = express.Router();

const authRequired = require("../middleware/authRequired");

const Note = require("../models/Note");

module.exports = router;
