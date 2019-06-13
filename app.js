// app config
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
// libs
const bodyParser = require("body-parser");

// route imports
const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");

// libs config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
