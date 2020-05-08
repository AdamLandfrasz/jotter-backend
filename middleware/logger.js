const logWithMoment = require("../util/logWithMoment");

const logger = (req, res, next) => {
  logWithMoment(
    `${req.method} | ${req.protocol}://${req.get("host")}${req.url}`
  );
  next();
};

module.exports = logger;
