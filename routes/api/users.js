const express = require("express");
const router = express.Router();
const { signup } = require("../../handlers/auth");
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

router.post("/", userSignupValidation, signup);
module.exports = router;
