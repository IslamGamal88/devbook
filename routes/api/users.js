const express = require("express");
const router = express.Router();
const { signup } = require("../../handlers/auth");
// validation
const { check } = require("express-validator/check");

const userValidation = [
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

// @route   POST api/users
// @desc    Test route
// @access  public

router.post("/", userValidation, signup);

module.exports = router;
