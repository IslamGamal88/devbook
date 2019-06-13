const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// import schemas
const User = require("./User");
// const

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error.message);
  }
};

connectDB();

module.exports.User = User;
