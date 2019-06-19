const { Profile } = require("../models");
const { validationResult } = require("express-validator/check");

// get current user route
module.exports.getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// create or update route
module.exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
  const user = req.user.id;
  const profileFields = {};
  if (user) profileFields.user = user;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map(skill => skill.trim());
  }

  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.status(200).json(profile);
    } else {
      profile = new Profile(profileFields);
      await profile.save();
      return res.status(200).json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "server error" });
  }
};

// get all profiles
module.exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// get a user's profile by id
module.exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Profile not found" });
  }
};

// delete account
module.exports.deleteAccount = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndRemove({ user: req.user.id });
    const deletedUser = await User.findOneAndRemove({ _id: req.user.id });
    return res.status(200).json({ msg: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
