var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('/myapp/routes/connection');
var currSession = require('/myapp/routes/session');
var csrf = require('/myapp/routes/csrf');
var crypto = require('crypto'); 

router.get("/", currSession.checkSessionLoggedIn, (req, res) => {
  res.redirect("/login");
})

router.get('/login', currSession.checkSessionLoggedIn, csrf.csrfProtection, (req,res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/login', csrf.parseForm, csrf.csrfProtection, (req,res) => {
  var query = `SELECT username, salt, password FROM user WHERE username=?`;
  var input = [req.body.username];
  db.connection.query(query, input , (err, user) => {
    if (err) {
      console.log(err)
      res.json({success: false, err});
    }
    var hash_password = crypto.pbkdf2Sync(req.body.password, user[0].salt,  
      10000, 64, `sha512`).toString(`hex`);

    if (user[0].password !== hash_password) {
      console.log("invalid password")
      res.json({success: false});
    }
    //redirect to homepage here
    console.log("login successful")
    req.session.user = {"username": user[0]["username"]};
    res.redirect("/homepage");
  });
});

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});

router.get('/register', csrf.csrfProtection, (req, res)=> {
  res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/register', csrf.parseForm, csrf.csrfProtection, (req, res) =>{
  var salt = crypto.randomBytes(16).toString('hex');
  var password = req.body.password;
  var hash_password = crypto.pbkdf2Sync(password, salt,  
    10000, 64, `sha512`).toString(`hex`);

  var query = "INSERT " +
    "INTO user(username, email, phone, password, salt, full_name, role) " +
    "VALUES(?,?,?,?,?,?,?)";
  var input = [
    req.body.username,
    req.body.email,
    req.body.phone,
    hash_password,
    salt,
    req.body.full_name,
    "regular"
  ];
  db.connection.query(query, input , (err, user) => {
    if (err) {
      //prompt user failure
      console.log(err)
      res.json({success: false, err});
    }
    //redirect to homepage here
    console.log("added to db")
    res.redirect('/');
  });
});

module.exports = router;
