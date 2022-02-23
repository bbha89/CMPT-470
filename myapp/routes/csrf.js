var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

router.use(csrfProtection);

module.exports.csrfProtection = csrfProtection;
module.exports.parseForm = parseForm;