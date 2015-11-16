var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Tours = require('../models/Tours');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


// Get all Tours
router.get('/', function (req, res, next) {
	Tours.getAllTours().then(function(x) {
		res.send(x);
	});
});