var express = require('express');
var router = express.Router();
var db = require('/myapp/routes/connection');
var currSession = require('/myapp/routes/session');
var csrf = require('/myapp/routes/csrf');

router.get('/search', currSession.checkSessionStatus, csrf.csrfProtection, (req, res) => {
  console.log(req.session)
  res.render('search-page', {username: req.session.user["username"], csrfToken: req.csrfToken()});
});

router.post('/search', csrf.parseForm, csrf.csrfProtection, (req, res) => {
  var query =
  ` 
    SELECT *
    FROM listing
    WHERE locationid IN (SELECT locationid FROM location WHERE country=? OR city=?)
  `
  var input = [req.body.country, req.body.city];
  db.connection.query(query, input , (err, listings) => {
    if (err) {
      //prompt user failure
      res.json({success: false, err});
    }
    // console.log(listings)
    res.render('display-listings', {title: "Found Listings", listings:listings, username: req.session.user['username']})
  });
});

router.get('/owned-listings', currSession.checkSessionStatus, (req, res) => {
  var query =
  ` 
    SELECT *
    FROM listing
    WHERE seller_username = ?
  `
  var input = [req.session.user['username']]
  db.connection.query(query, input , (err, listings) => {
    if (err) {
      //prompt user failure
      res.json({success: false, err});
    }
    // console.log(listings)
    res.render('display-listings', {title: "Your Listings", listings: listings, username: req.session.user['username']})
  });
});

module.exports = router;