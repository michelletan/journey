// Grab models from database
var database = require('./db');
var models = database.models;
var User = models.User;
var Post = models.Post;
var Journey = models.Journey;

// Set up Router
var router = require('express').Router();
var Promise = require('bluebird');

router.get('/', function(req,res,next){
	
})

module.exports = router;
