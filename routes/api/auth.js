const express = require("express");
const router = express.Router();
const { loginRequired } = require("../../middleware/auth");
const { check } = require("express-validator/check");
const { login } = require("../../handlers/auth");
const { getCurrentUser } = require("../../handlers/auth");
// @route   GET api/auth
// @desc    get current user at any given time
// @access  public

router.get("/", loginRequired, getCurrentUser);
// =====================================================

// @route   POST api/auth
// @desc    Test route
// @access  public

const userLoginValidation = [check("email", "Invalid Email").isEmail(), check("password", "Password required").exists()];

router.post("/", userLoginValidation, login);

module.exports = router;
