const express = require("express");
const router = express.Router();
const { signup, login } = require("../../handlers/auth");
// validation
const { check } = require("express-validator/check");

const userSignupValidation = [
  // check if username is empty
  check("name", "Name is required.")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check("email", "Please enter a valid email.")
    .isEmail()
    .normalizeEmail(),
  check("password", "Password must be atleast 8 characters.").isLength({ min: 8 })
];

const userLoginValidation = [
  check("email", "Invalid email/password")
    .isEmail()
    .normalizeEmail(),
  check("password", "Invalid email/password").exists()
];

// @route   POST api/users
// @desc    Test route
// @access  public

router.post("/", userSignupValidation, signup);
router.post("/login", userLoginValidation, login);
module.exports = router;
