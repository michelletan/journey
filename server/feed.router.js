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
	.then(function(journeys){
		console.log("Server sending feed: ", journeys);
		res.status(200).send(journeys);
	})
	.catch(next);
})

module.exports = router;
