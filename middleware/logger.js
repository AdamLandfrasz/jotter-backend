const moment = require("moment");

const logWithMoment = (text) => {
  console.log(`${text} | ${moment().format("L LTS")}`);
};

const logger = (req, res, next) => {
  logWithMoment(
    `${req.method} | ${req.protocol}://${req.get("host")}${req.url}`
  );
  next();
};

module.exports = { logger, logWithMoment };
