const jwt = require("jsonwebtoken");

require("dotenv").config();

const authRequired = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token)
    return res.status(401).json({ success: false, message: "Access denied!" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.userId = verified.userId;
    req.userEmail = verified.userEmail;
    next();
  } catch (e) {
    res.status(400).json({ success: false, message: e.toString() });
  }
};

module.exports = authRequired;
