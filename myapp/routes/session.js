var express = require('express');
var session = require("express-session");
var router = express.Router();

router.use(
  session({
    key: "user_sid",
    secret: "thisismySecretKEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

router.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// Redirect user to homepage if already logged in
var checkSessionLoggedIn = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/homepage");
  } else {
    console.log("no session will have to login first")
    next();
  }
};

// Redirect user to login if not already logged in
var checkSessionStatus = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    console.log("no session will have to login first");
    res.redirect("/login");
  }
};

module.exports = router;
module.exports.checkSessionLoggedIn = checkSessionLoggedIn;
module.exports.checkSessionStatus = checkSessionStatus;