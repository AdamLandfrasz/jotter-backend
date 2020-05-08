const moment = require("moment");

const logWithMoment = (text) => {
  console.log(`${text} | ${moment().format("L LTS")}`);
};

module.exports = logWithMoment;
