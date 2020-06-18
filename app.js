const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./middleware/logger");

const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");

require("dotenv").config();

const app = express();
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) logger.logWithMoment(`Failed to connect MongoDB`);
    else logger.logWithMoment(`MongoDB connected successfully`);
  }
);

app.use(logger.logger);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.logWithMoment(`Server started on port ${PORT}`));
