var express = require('express');
var router = express.Router();
var path = require('path');
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET user homepage. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  
  console.log(req.session);
  var query = `SELECT * FROM user WHERE username=?`;
  var input = [req.session.user["username"]];

  
  getLatestLocations = (latestLocationsSql) => {
    return new Promise((resolve, reject) => {
      db.connection.query(latestLocationsSql, (err, result) => {
        if (err) reject(err)
        else {
          resolve(result);
        }
      })
    })
  }
  
  getlatestListings = (latestListingsSql) => {
    return new Promise((resolve, reject) => {
      db.connection.query(latestListingsSql, (err, result) => {
        if (err) reject(err)
        else {
          resolve(result);
        }
      })
    })
  }
  
  loadPage = ( query, input, latestLocations, latestListings) => {
      return new Promise((resolve, reject) => {

        db.connection.query(query, input, (err, rows) => {
        if(err){
          res.json({ success: false, err })
          reject('failure')
        }
        else{
          var user_info = rows[0];
          res.render('home', {username: user_info.username, latestLocations: latestLocations, latestListings: latestListings});
          resolve('success')
        }
      })
    })
  }
  
  async function runHomepageFunctions(query, input) {
  
    var latestLocationsSql = 'SELECT * FROM location ORDER BY locationid DESC LIMIT 3';
    var latestListingsSql = 'SELECT * FROM listing ORDER BY listingid DESC LIMIT 3';
    try {
      var latestLocations = await getLatestLocations(latestLocationsSql);
      var latestListings = await getlatestListings(latestListingsSql);
      var res = await loadPage(query, input, latestLocations, latestListings);
      // console.log('vars', latestListings, latestLocations);
      return {result: res}
    } catch(error) {
      console.log('rejected', error);
      return 0;
    }
  }

  runHomepageFunctions(query, input);
});

module.exports = router;