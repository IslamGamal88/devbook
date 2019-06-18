const express = require("express");
const router = express.Router();
const { loginRequired } = require("../../middleware/auth");
const { getCurrentUserProfile, createOrUpdateProfile } = require("../../handlers/profile");
const { check } = require("express-validator/check");

// @ route   GET /api/profile/me
// @ desc    get current user profile
// @ access  public
router.get("/me", loginRequired, getCurrentUserProfile);

// @ route   POST /api/profile/
// @ desc    create or update a user profile
// @ access  public
const validateProfile = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills are required")
    .not()
    .isEmpty()
];

router.post("/", validateProfile, loginRequired, createOrUpdateProfile);

module.exports = router;
