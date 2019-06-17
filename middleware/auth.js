const jwt = require("jsonwebtoken");
const config = require("config");
const secretKey = config.get("secretKey");

module.exports.loginRequired = function(req, res, next) {
  try {
    // let token = req.header("x-auth-token");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    let decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
