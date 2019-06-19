const express = require("express");
const router = express.Router();
const { loginRequired, ensureCorrectUser } = require("../../middleware/auth");
const { getCurrentUserProfile, createOrUpdateProfile, getAllProfiles, getUserProfile, deleteAccount } = require("../../handlers/profile");
const { check } = require("express-validator/check");

// @ route   GET /api/profile/me
// @ desc    get current user profile
// @ access  private
router.get("/me", loginRequired, getCurrentUserProfile);
// =====================================================

// @ route   POST /api/profile/
// @ desc    create or update a user profile
// @ access  private
const validateProfile = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills are required")
    .not()
    .isEmpty()
];

router.post("/", validateProfile, loginRequired, createOrUpdateProfile);
// =====================================================

// @ route   GET /api/profile/user/:user_id
// @ desc    get all profiles
// @ access  public
router.get("/", getAllProfiles);
// =====================================================

// @ route   GET /api/profile/user/:user_id
// @ desc    get all profiles
// @ access  private
router.get("/user/:user_id", loginRequired, getUserProfile);
// =====================================================

// @ route   DELETE /api/profile/user/:user_id
// @ desc    get all profiles
// @ access  private
router.delete("/user/:user_id", loginRequired, ensureCorrectUser, deleteAccount);
module.exports = router;
