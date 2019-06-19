const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// import schemas
const User = require("./User");
const Profile = require("./Profile");
// const

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
  }
};

connectDB();

module.exports.User = User;
module.exports.Profile = Profile;
