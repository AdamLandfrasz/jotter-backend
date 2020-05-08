const express = require("express");
const mongoose = require("mongoose");

const logWithMoment = require("./util/logWithMoment");
const logger = require("./middleware/logger");

require("dotenv").config();

const app = express();
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) logWithMoment(`Failed to connect MongoDB`);
    else logWithMoment(`MongoDB connected successfully`);
  }
);

app.use(logger);

app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logWithMoment(`Server started on port ${PORT}`));
