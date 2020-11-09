// gets env vars
if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

const sq = require("./config/connection");

const app = express();

// Import models
const { Comment, Post, User } = require("./models");

const PORT = process.env.PORT || 3000;

app.use(
  session({
    key: "user",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(cookieParser());

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public/")));

// homepage rendering (displays the homepage)
app.get("/", async function (req, res) {
  res.render("home");
});

// displays the dashboard, sends the current user to the dashbaord
app.get("/dashboard", sessionChecker, function (req, res) {
  res.render("dashboard", { username: req.session.user })
});

// fetches and sends all the posts
app.get("/posts", async function (req, res) {
  const posts = await Post.findAll()
  res.send({ posts })
});

// adds a post
app.post("/posts", sessionChecker, async function (req, res) {
  // implement this now
  res.send({});
});

// checks if a user is already logged in
// if they are logged in redirect them to the homepage
// or else send them to the login page
app.get("/login", async function (req, res) {
  if (!req.session.user) // is the user not signed in?
   {
    res.render("login");
  } else res.redirect("/");
});

// check username password, authorize or reject username and password
app.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.username,
      password: req.body.password,
    });
    if (user != null) {
      req.session.user = req.body.username;
    }
    res.redirect("/");
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.end();
  }
});

// log user out by deleting session vars
app.get("/logout", function (req, res) {
  delete req.session.user;
  res.redirect("/");
});

// displays the signup page
app.get("/signup", function (req, res) {
  res.render("signup");
});

// creates a new user if the user does not exist
app.post("/users", async function (req, res) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { email: username } });

  if (!existingUser) { // if there is no existing user
    const user = await User.create({
      email: username,
      password: password,
    });

    if (user) {
      req.session.user = username;
      res.redirect("/dashboard");
    } else res.status(500);
  } else res.status(500);
});

// returns an array of posts for a specific user
app.get("/posts/:name", async (req, res) => {
  if (req.params.name === req.session.user) {
    const posts = await Post.findAll({ where: { user_id: req.params.name } });
    res.json({
      posts,
    });
  } else {
    // user trying to fetch another user's posts
    res.status(403);
  }
});

sq.sync();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
