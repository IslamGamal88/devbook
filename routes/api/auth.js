const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { loginRequired } = require("../../middleware/auth");
const { check } = require("express-validator/check");
const { login } = require("../../handlers/auth");

// @route   GET api/auth
// @desc    get current user at any given time
// @access  public

router.get("/", loginRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST api/auth
// @desc    Test route
// @access  public

const userLoginValidation = [check("email", "Invalid Email").isEmail(), check("password", "Password required").exists()];

router.post("/", userLoginValidation, login);

module.exports = router;
