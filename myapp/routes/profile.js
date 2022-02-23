var express = require('express');
var router = express.Router();
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET user Profile. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  var query = `SELECT * FROM user WHERE username=?`;
  var input = [req.session.user["username"]];
  db.connection.query(query, input, (err, results) => {
    if (err) {
      console.log('ERRN:', err.message)
    }
    var user_info = results[0];
    res.render('profile', {username: user_info.username, email: user_info.email, full_name: user_info.full_name, role: user_info.role, phone: user_info.phone});
  });
});




module.exports = router;