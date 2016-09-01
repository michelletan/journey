// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Post = db.model('post');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

router.get('/', function(req,res,next){
	Journey.findAll({
		order: 'created DESC',
		include: [User]
	})
	.then(function(journeysToSend){
		console.log("Server sending feed: ", journeysToSend);
		res.status(200).send(journeysToSend);
	})
	.catch(next);
})

module.exports = router;
